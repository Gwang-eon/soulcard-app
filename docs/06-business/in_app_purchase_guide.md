# 💰 타로카드 앱 인앱결제 시스템 구현 가이드

## 📋 목차
1. [인앱결제 개요](#인앱결제-개요)
2. [플랫폼별 정책 및 수수료](#플랫폼별-정책-및-수수료)
3. [iOS 인앱결제 구현](#ios-인앱결제-구현)
4. [Android 인앱결제 구현](#android-인앱결제-구현)
5. [웹/앱 결제 분기 처리](#웹앱-결제-분기-처리)
6. [백엔드 영수증 검증](#백엔드-영수증-검증)
7. [가격 정책 및 최적화](#가격-정책-및-최적화)
8. [테스트 및 배포](#테스트-및-배포)

## 💳 인앱결제 개요

### 플랫폼별 결제 정책
| 플랫폼 | 결제 방식 | 수수료 | 정책 |
|--------|-----------|--------|------|
| **iOS** | Apple IAP | 30% (첫해) → 15% (2년차) | 디지털 재화 필수 |
| **Android** | Google Play 결제 | 30% → 15% (첫 $1M) | 디지털 재화 필수 |
| **웹** | 일반 PG (토스페이먼츠 등) | 2-3% | 자유롭게 선택 가능 |

### 중요 정책 사항
```yaml
앱스토어 정책:
  필수사항:
    - 디지털 재화(토큰)는 반드시 인앱결제
    - 외부 결제 링크 제공 금지
    - 가격은 앱스토어 티어에 맞춰야 함
  
  예외사항:
    - 실물 상품 구매
    - 오프라인 서비스
    - 리더 앱 (최근 정책 변경)

위반시:
  - 앱 거부 또는 삭제
  - 개발자 계정 정지
  - 법적 문제 가능성
```

## 🍎 iOS 인앱결제 구현

### 1. App Store Connect 설정
```yaml
상품 등록:
  1. App Store Connect 로그인
  2. 앱 선택 → 인앱 구입 → (+) 추가
  3. 상품 유형 선택:
     - 소모품 (Consumable) ✓ 토큰에 적합
     - 비소모품 (Non-Consumable)
     - 자동 갱신 구독
     - 비갱신 구독
```

### 2. StoreKit 구현 (Swift)
```swift
// TarotTokenStore.swift
import StoreKit

class TarotTokenStore: NSObject, ObservableObject {
    @Published var tokens: [Product] = []
    @Published var purchasedTokens: [Product] = []
    
    // 상품 ID (App Store Connect에서 설정)
    let tokenProductIds = [
        "com.tarotapp.tokens.10",    // 10개 토큰
        "com.tarotapp.tokens.30",    // 30개 토큰
        "com.tarotapp.tokens.100",   // 100개 토큰
        "com.tarotapp.tokens.300"    // 300개 토큰
    ]
    
    override init() {
        super.init()
        Task {
            await loadProducts()
        }
    }
    
    // 상품 로드
    func loadProducts() async {
        do {
            tokens = try await Product.products(for: tokenProductIds)
            print("상품 로드 완료: \(tokens.count)개")
        } catch {
            print("상품 로드 실패: \(error)")
        }
    }
    
    // 구매 처리
    func purchase(_ product: Product) async throws -> Transaction? {
        let result = try await product.purchase()
        
        switch result {
        case .success(let verification):
            let transaction = try checkVerified(verification)
            
            // 백엔드에 영수증 전송
            await sendReceiptToBackend(transaction)
            
            // 거래 완료
            await transaction.finish()
            
            return transaction
            
        case .userCancelled, .pending:
            return nil
        default:
            return nil
        }
    }
    
    // 영수증 검증
    func checkVerified<T>(_ result: VerificationResult<T>) throws -> T {
        switch result {
        case .unverified:
            throw StoreError.failedVerification
        case .verified(let safe):
            return safe
        }
    }
    
    // 백엔드 전송
    func sendReceiptToBackend(_ transaction: Transaction) async {
        guard let receiptData = try? Data(contentsOf: Bundle.main.appStoreReceiptURL!) else {
            return
        }
        
        let receipt = receiptData.base64EncodedString()
        
        // API 호출
        let url = URL(string: "https://api.tarot-app.com/api/verify-receipt/ios")!
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let body = [
            "receipt": receipt,
            "transaction_id": transaction.id,
            "product_id": transaction.productID,
            "user_id": getUserId()
        ]
        
        request.httpBody = try? JSONSerialization.data(withJSONObject: body)
        
        let (data, response) = try! await URLSession.shared.data(for: request)
        // 응답 처리
    }
}
```

### 3. SwiftUI 구매 화면
```swift
// TokenPurchaseView.swift
import SwiftUI
import StoreKit

struct TokenPurchaseView: View {
    @StateObject private var store = TarotTokenStore()
    @State private var isPurchasing = false
    @State private var errorMessage = ""
    
    var body: some View {
        NavigationView {
            VStack {
                Text("토큰 충전")
                    .font(.largeTitle)
                    .padding()
                
                if store.tokens.isEmpty {
                    ProgressView("상품 로딩 중...")
                } else {
                    ForEach(store.tokens, id: \.id) { product in
                        TokenProductRow(
                            product: product,
                            onPurchase: { await purchase(product) }
                        )
                    }
                }
                
                if !errorMessage.isEmpty {
                    Text(errorMessage)
                        .foregroundColor(.red)
                        .padding()
                }
                
                Spacer()
                
                // 복원 버튼 (필수)
                Button("구매 내역 복원") {
                    Task {
                        await store.restorePurchases()
                    }
                }
                .padding()
            }
            .navigationBarTitle("토큰 구매", displayMode: .inline)
        }
    }
    
    func purchase(_ product: Product) async {
        isPurchasing = true
        errorMessage = ""
        
        do {
            if let transaction = try await store.purchase(product) {
                // 구매 성공
                print("구매 완료: \(product.displayName)")
            }
        } catch {
            errorMessage = "구매 실패: \(error.localizedDescription)"
        }
        
        isPurchasing = false
    }
}

struct TokenProductRow: View {
    let product: Product
    let onPurchase: () async -> Void
    
    var body: some View {
        HStack {
            VStack(alignment: .leading) {
                Text(product.displayName)
                    .font(.headline)
                Text(product.description)
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            
            Spacer()
            
            Button(action: {
                Task {
                    await onPurchase()
                }
            }) {
                Text(product.displayPrice)
                    .bold()
                    .padding(.horizontal, 20)
                    .padding(.vertical, 10)
                    .background(Color.blue)
                    .foregroundColor(.white)
                    .cornerRadius(10)
            }
        }
        .padding()
        .background(Color.gray.opacity(0.1))
        .cornerRadius(10)
        .padding(.horizontal)
    }
}
```

## 🤖 Android 인앱결제 구현

### 1. Google Play Console 설정
```yaml
상품 등록:
  1. Google Play Console 로그인
  2. 앱 선택 → 수익 창출 → 제품 → 인앱 상품
  3. 상품 만들기:
     - 제품 ID: tokens_10, tokens_30, tokens_100
     - 이름: 토큰 10개, 토큰 30개, 토큰 100개
     - 가격 설정
```

### 2. Google Play Billing 구현 (Kotlin)
```kotlin
// TarotBillingManager.kt
import com.android.billingclient.api.*
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow

class TarotBillingManager(
    private val activity: Activity,
    private val onPurchaseComplete: (Purchase) -> Unit
) : PurchasesUpdatedListener {
    
    private val billingClient = BillingClient.newBuilder(activity)
        .setListener(this)
        .enablePendingPurchases()
        .build()
    
    private val _products = MutableStateFlow<List<ProductDetails>>(emptyList())
    val products = _products.asStateFlow()
    
    // 상품 ID
    private val productIds = listOf(
        "tokens_10",
        "tokens_30", 
        "tokens_100",
        "tokens_300"
    )
    
    init {
        connectToBillingService()
    }
    
    private fun connectToBillingService() {
        billingClient.startConnection(object : BillingClientStateListener {
            override fun onBillingSetupFinished(result: BillingResult) {
                if (result.responseCode == BillingClient.BillingResponseCode.OK) {
                    queryProducts()
                }
            }
            
            override fun onBillingServiceDisconnected() {
                // 재연결 로직
            }
        })
    }
    
    private fun queryProducts() {
        val productList = productIds.map { productId ->
            QueryProductDetailsParams.Product.newBuilder()
                .setProductId(productId)
                .setProductType(BillingClient.ProductType.INAPP)
                .build()
        }
        
        val params = QueryProductDetailsParams.newBuilder()
            .setProductList(productList)
            .build()
            
        billingClient.queryProductDetailsAsync(params) { result, productDetailsList ->
            if (result.responseCode == BillingClient.BillingResponseCode.OK) {
                _products.value = productDetailsList
            }
        }
    }
    
    fun purchaseToken(productDetails: ProductDetails) {
        val productDetailsParamsList = listOf(
            BillingFlowParams.ProductDetailsParams.newBuilder()
                .setProductDetails(productDetails)
                .build()
        )
        
        val billingFlowParams = BillingFlowParams.newBuilder()
            .setProductDetailsParamsList(productDetailsParamsList)
            .build()
            
        billingClient.launchBillingFlow(activity, billingFlowParams)
    }
    
    override fun onPurchasesUpdated(
        billingResult: BillingResult,
        purchases: MutableList<Purchase>?
    ) {
        if (billingResult.responseCode == BillingClient.BillingResponseCode.OK) {
            purchases?.forEach { purchase ->
                handlePurchase(purchase)
            }
        }
    }
    
    private fun handlePurchase(purchase: Purchase) {
        // 구매 확인
        if (purchase.purchaseState == Purchase.PurchaseState.PURCHASED) {
            // 백엔드에 영수증 전송
            sendReceiptToBackend(purchase)
            
            // 구매 확인
            if (!purchase.isAcknowledged) {
                val acknowledgePurchaseParams = AcknowledgePurchaseParams.newBuilder()
                    .setPurchaseToken(purchase.purchaseToken)
                    .build()
                    
                billingClient.acknowledgePurchase(acknowledgePurchaseParams) { result ->
                    if (result.responseCode == BillingClient.BillingResponseCode.OK) {
                        onPurchaseComplete(purchase)
                    }
                }
            }
        }
    }
    
    private fun sendReceiptToBackend(purchase: Purchase) {
        val receipt = mapOf(
            "orderId" to purchase.orderId,
            "packageName" to purchase.packageName,
            "productId" to purchase.products.first(),
            "purchaseToken" to purchase.purchaseToken,
            "purchaseTime" to purchase.purchaseTime,
            "signature" to purchase.signature,
            "originalJson" to purchase.originalJson
        )
        
        // Retrofit 또는 다른 네트워크 라이브러리로 전송
        apiService.verifyPurchase(receipt).enqueue(object : Callback<PurchaseResponse> {
            override fun onResponse(call: Call<PurchaseResponse>, response: Response<PurchaseResponse>) {
                if (response.isSuccessful) {
                    // 토큰 지급 완료
                }
            }
            
            override fun onFailure(call: Call<PurchaseResponse>, t: Throwable) {
                // 에러 처리
            }
        })
    }
}
```

### 3. Compose UI 구현
```kotlin
// TokenPurchaseScreen.kt
@Composable
fun TokenPurchaseScreen(
    billingManager: TarotBillingManager,
    onBackPressed: () -> Unit
) {
    val products by billingManager.products.collectAsState()
    
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        TopAppBar(
            title = { Text("토큰 충전") },
            navigationIcon = {
                IconButton(onClick = onBackPressed) {
                    Icon(Icons.Default.ArrowBack, contentDescription = "뒤로")
                }
            }
        )
        
        if (products.isEmpty()) {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                CircularProgressIndicator()
            }
        } else {
            LazyColumn {
                items(products) { product ->
                    TokenProductCard(
                        product = product,
                        onPurchase = { billingManager.purchaseToken(product) }
                    )
                }
            }
        }
    }
}

@Composable
fun TokenProductCard(
    product: ProductDetails,
    onPurchase: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(
                    text = product.name,
                    style = MaterialTheme.typography.headlineSmall
                )
                Text(
                    text = product.description,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
            
            Button(
                onClick = onPurchase,
                colors = ButtonDefaults.buttonColors(
                    containerColor = MaterialTheme.colorScheme.primary
                )
            ) {
                Text(
                    text = product.oneTimePurchaseOfferDetails?.formattedPrice ?: "",
                    style = MaterialTheme.typography.labelLarge
                )
            }
        }
    }
}
```

## 🌐 웹/앱 결제 분기 처리

### 1. 플랫폼 감지 및 결제 라우팅
```typescript
// utils/platform.ts
export const getPlatform = () => {
  const userAgent = navigator.userAgent || navigator.vendor;
  
  // iOS 감지
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    // 앱 내부인지 확인
    if (window.webkit?.messageHandlers?.iapHandler) {
      return 'ios-app';
    }
    return 'ios-web';
  }
  
  // Android 감지
  if (/android/i.test(userAgent)) {
    // 앱 내부인지 확인
    if (window.AndroidBridge?.purchaseToken) {
      return 'android-app';
    }
    return 'android-web';
  }
  
  return 'web';
};

// hooks/usePayment.ts
export const usePayment = () => {
  const platform = getPlatform();
  
  const purchaseToken = async (productId: string, amount: number) => {
    switch (platform) {
      case 'ios-app':
        // iOS 앱 브리지 호출
        return window.webkit.messageHandlers.iapHandler.postMessage({
          action: 'purchase',
          productId: productId
        });
        
      case 'android-app':
        // Android 앱 브리지 호출
        return window.AndroidBridge.purchaseToken(productId);
        
      case 'web':
      case 'ios-web':
      case 'android-web':
        // 웹 결제 (토스페이먼츠 등)
        return webPayment(productId, amount);
        
      default:
        throw new Error('지원하지 않는 플랫폼입니다');
    }
  };
  
  return { purchaseToken, platform };
};
```

### 2. Next.js 결제 페이지
```tsx
// pages/purchase/tokens.tsx
import { usePayment } from '@/hooks/usePayment';
import { useState } from 'react';

interface TokenPackage {
  id: string;
  name: string;
  tokens: number;
  price: number;
  appStoreId?: string;
  playStoreId?: string;
}

const tokenPackages: TokenPackage[] = [
  {
    id: 'tokens_10',
    name: '토큰 10개',
    tokens: 10,
    price: 2900,
    appStoreId: 'com.tarotapp.tokens.10',
    playStoreId: 'tokens_10'
  },
  {
    id: 'tokens_30',
    name: '토큰 30개',
    tokens: 30,
    price: 7900,
    appStoreId: 'com.tarotapp.tokens.30',
    playStoreId: 'tokens_30'
  },
  {
    id: 'tokens_100',
    name: '토큰 100개',
    tokens: 100,
    price: 19900,
    appStoreId: 'com.tarotapp.tokens.100',
    playStoreId: 'tokens_100'
  }
];

export default function TokenPurchasePage() {
  const { purchaseToken, platform } = usePayment();
  const [loading, setLoading] = useState(false);
  
  const handlePurchase = async (pkg: TokenPackage) => {
    setLoading(true);
    
    try {
      let productId = pkg.id;
      
      // 플랫폼별 상품 ID 선택
      if (platform === 'ios-app' && pkg.appStoreId) {
        productId = pkg.appStoreId;
      } else if (platform === 'android-app' && pkg.playStoreId) {
        productId = pkg.playStoreId;
      }
      
      await purchaseToken(productId, pkg.price);
      
      // 구매 완료 처리
      toast.success('토큰이 충전되었습니다!');
      router.push('/');
      
    } catch (error) {
      toast.error('구매 중 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">토큰 충전</h1>
      
      {/* 플랫폼별 안내 메시지 */}
      {platform.includes('app') && (
        <div className="bg-blue-50 p-4 rounded mb-4">
          <p className="text-sm text-blue-800">
            앱 내 구매로 진행됩니다. 결제는 앱스토어를 통해 안전하게 처리됩니다.
          </p>
        </div>
      )}
      
      <div className="grid gap-4">
        {tokenPackages.map((pkg) => (
          <div key={pkg.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{pkg.name}</h3>
                <p className="text-gray-600">
                  타로 리딩 {Math.floor(pkg.tokens / 3)}회 가능
                </p>
              </div>
              <button
                onClick={() => handlePurchase(pkg)}
                disabled={loading}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg"
              >
                ₩{pkg.price.toLocaleString()}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* 웹에서만 표시 */}
      {platform === 'web' && (
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>모바일 앱에서는 더 많은 혜택을 받으실 수 있습니다!</p>
          <div className="flex gap-4 justify-center mt-2">
            <a href="/download/ios" className="text-blue-500">
              iOS 앱 다운로드
            </a>
            <a href="/download/android" className="text-blue-500">
              Android 앱 다운로드
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
```

### 3. 웹 결제 구현 (토스페이먼츠)
```typescript
// lib/webPayment.ts
import { loadTossPayments } from '@tosspayments/payment-sdk';

export async function webPayment(productId: string, amount: number) {
  const tossPayments = await loadTossPayments(
    process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!
  );
  
  const payment = await tossPayments.requestPayment('카드', {
    amount,
    orderId: `${productId}_${Date.now()}`,
    orderName: getProductName(productId),
    customerName: getUserName(),
    successUrl: `${window.location.origin}/api/payment/success`,
    failUrl: `${window.location.origin}/api/payment/fail`,
  });
  
  return payment;
}

// pages/api/payment/success.ts
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { paymentKey, orderId, amount } = req.query;
  
  try {
    // 토스페이먼츠 결제 승인 API 호출
    const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.TOSS_SECRET_KEY + ':'
        ).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount,
      }),
    });
    
    if (response.ok) {
      // 결제 성공 - 토큰 지급
      await grantTokensToUser(orderId, amount);
      res.redirect('/purchase/success');
    } else {
      res.redirect('/purchase/fail');
    }
  } catch (error) {
    res.redirect('/purchase/fail');
  }
}
```

## 🔐 백엔드 영수증 검증

### 1. iOS 영수증 검증
```typescript
// api/verify-receipt/ios.ts
import fetch from 'node-fetch';

interface AppleVerifyResponse {
  status: number;
  receipt: {
    in_app: Array<{
      product_id: string;
      transaction_id: string;
      original_transaction_id: string;
      purchase_date_ms: string;
    }>;
  };
}

export async function verifyAppleReceipt(
  receipt: string,
  isProduction: boolean = true
) {
  const url = isProduction
    ? 'https://buy.itunes.apple.com/verifyReceipt'
    : 'https://sandbox.itunes.apple.com/verifyReceipt';
    
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'receipt-data': receipt,
      'password': process.env.APPLE_SHARED_SECRET,
      'exclude-old-transactions': true,
    }),
  });
  
  const data = await response.json() as AppleVerifyResponse;
  
  if (data.status === 0) {
    // 검증 성공
    return {
      valid: true,
      purchases: data.receipt.in_app,
    };
  } else if (data.status === 21007) {
    // 샌드박스 영수증이 프로덕션으로 전송됨
    return verifyAppleReceipt(receipt, false);
  }
  
  return { valid: false, error: `Status: ${data.status}` };
}
```

### 2. Android 영수증 검증
```typescript
// api/verify-receipt/android.ts
import { google } from 'googleapis';

const androidPublisher = google.androidpublisher('v3');

export async function verifyGooglePurchase(
  packageName: string,
  productId: string,
  purchaseToken: string
) {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: 'path/to/service-account-key.json',
      scopes: ['https://www.googleapis.com/auth/androidpublisher'],
    });
    
    const authClient = await auth.getClient();
    google.options({ auth: authClient });
    
    const response = await androidPublisher.purchases.products.get({
      packageName,
      productId,
      token: purchaseToken,
    });
    
    if (response.data.purchaseState === 0) {
      // 구매 확인됨
      return {
        valid: true,
        orderId: response.data.orderId,
        purchaseTime: response.data.purchaseTimeMillis,
      };
    }
    
    return { valid: false, error: 'Invalid purchase state' };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}
```

### 3. 통합 영수증 검증 API
```typescript
// pages/api/verify-purchase.ts
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { platform, receipt, productId, userId } = req.body;
  
  try {
    let verificationResult;
    
    switch (platform) {
      case 'ios':
        verificationResult = await verifyAppleReceipt(receipt);
        break;
        
      case 'android':
        verificationResult = await verifyGooglePurchase(
          'com.tarotapp',
          productId,
          receipt.purchaseToken
        );
        break;
        
      default:
        return res.status(400).json({ error: 'Invalid platform' });
    }
    
    if (verificationResult.valid) {
      // 토큰 지급
      const tokens = getTokenAmount(productId);
      await grantTokens(userId, tokens);
      
      // 구매 기록 저장
      await savePurchaseRecord({
        userId,
        platform,
        productId,
        tokens,
        receipt: JSON.stringify(receipt),
        verifiedAt: new Date(),
      });
      
      return res.status(200).json({
        success: true,
        tokens,
      });
    }
    
    return res.status(400).json({
      error: 'Invalid receipt',
      details: verificationResult.error,
    });
    
  } catch (error) {
    console.error('Receipt verification error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
```

## 💰 가격 정책 및 최적화

### 1. 가격 티어 설정
```yaml
앱스토어 가격 티어:
  Tier 1: $0.99 (₩1,200)
  Tier 3: $2.99 (₩3,900)
  Tier 8: $7.99 (₩9,900)
  Tier 20: $19.99 (₩25,000)

추천 토큰 패키지:
  기본팩:
    - 10토큰: ₩2,900 (개당 ₩290)
    - 상담 3회 가능
    
  인기팩:
    - 30토큰: ₩7,900 (개당 ₩263) - 10% 할인
    - 상담 10회 가능
    
  프리미엄팩:
    - 100토큰: ₩19,900 (개당 ₩199) - 30% 할인
    - 상담 33회 가능
    
  메가팩:
    - 300토큰: ₩49,900 (개당 ₩166) - 40% 할인
    - 상담 100회 가능
```

### 2. 수수료 고려한 가격 전략
```typescript
// 실제 수익 계산
function calculateNetRevenue(price: number, platform: string) {
  const platformFees = {
    ios: 0.30,        // 30% (첫해)
    iosReduced: 0.15, // 15% (2년차 or 소규모)
    android: 0.30,    // 30%
    androidReduced: 0.15, // 15% (첫 $1M)
    web: 0.03,        // 3% (PG 수수료)
  };
  
  const fee = platformFees[platform] || 0.30;
  const netRevenue = price * (1 - fee);
  
  return {
    gross: price,
    fee: price * fee,
    net: netRevenue,
  };
}

// 예시: ₩10,000 상품
// iOS: ₩7,000 순수익 (30% 수수료)
// Web: ₩9,700 순수익 (3% 수수료)
```

### 3. 프로모션 전략
```typescript
// 첫 구매 보너스
async function applyFirstPurchaseBonus(userId: string, tokens: number) {
  const isFirstPurchase = await checkFirstPurchase(userId);
  
  if (isFirstPurchase) {
    const bonusTokens = Math.floor(tokens * 0.5); // 50% 보너스
    await grantTokens(userId, bonusTokens);
    
    return {
      purchased: tokens,
      bonus: bonusTokens,
      total: tokens + bonusTokens,
    };
  }
  
  return { purchased: tokens, bonus: 0, total: tokens };
}

// 대량 구매 보너스
const bulkPurchaseBonus = {
  30: 10,   // 30개 구매시 +10%
  100: 30,  // 100개 구매시 +30%
  300: 50,  // 300개 구매시 +50%
};
```

## 🧪 테스트 및 배포

### 1. 테스트 계정 설정
```yaml
iOS 테스트:
  1. App Store Connect → 사용자 및 액세스
  2. 샌드박스 테스터 추가
  3. 테스트 기기에서 샌드박스 계정 로그인
  4. 실제 구매 프로세스 테스트 (무료)

Android 테스트:
  1. Google Play Console → 설정 → 라이선스 테스트
  2. 테스터 이메일 추가
  3. 테스트 기기에서 해당 계정 로그인
  4. 테스트 카드로 구매 진행
```

### 2. 테스트 시나리오
```typescript
// e2e/purchase.test.ts
describe('인앱 구매 테스트', () => {
  it('토큰 구매 플로우', async () => {
    // 1. 구매 페이지 접속
    await page.goto('/purchase/tokens');
    
    // 2. 상품 선택
    await page.click('[data-testid="token-30"]');
    
    // 3. 구매 진행
    if (platform === 'ios-app') {
      // iOS 구매 다이얼로그 대기
      await page.waitForSelector('.ios-purchase-dialog');
    } else if (platform === 'android-app') {
      // Android 구매 다이얼로그 대기
      await page.waitForSelector('.android-purchase-dialog');
    }
    
    // 4. 구매 완료 확인
    await page.waitForNavigation();
    expect(page.url()).toBe('/purchase/success');
    
    // 5. 토큰 잔액 확인
    const balance = await page.textContent('.token-balance');
    expect(balance).toBe('30');
  });
});
```

### 3. 배포 체크리스트
```yaml
iOS 배포 전:
  - [ ] 인앱 구매 상품 심사 제출
  - [ ] 영수증 검증 서버 준비
  - [ ] 복원 기능 구현 확인
  - [ ] 테스트 계정으로 전체 플로우 테스트
  - [ ] 환불 정책 명시

Android 배포 전:
  - [ ] 인앱 상품 활성화
  - [ ] 서명된 APK/AAB로 테스트
  - [ ] 구매 토큰 검증 구현
  - [ ] 테스트 구매 진행
  - [ ] 개인정보처리방침 업데이트

공통:
  - [ ] 서버 영수증 검증 API 배포
  - [ ] 구매 실패 시 복구 로직
  - [ ] 네트워크 오류 처리
  - [ ] 구매 내역 로깅
  - [ ] 고객 지원 준비
```

## 📊 모니터링 및 분석

### 1. 구매 분석 대시보드
```typescript
// 구매 지표 수집
interface PurchaseMetrics {
  platform: 'ios' | 'android' | 'web';
  productId: string;
  price: number;
  userId: string;
  timestamp: Date;
  country: string;
  currency: string;
}

// Google Analytics 이벤트
gtag('event', 'purchase', {
  transaction_id: orderId,
  value: price,
  currency: 'KRW',
  items: [{
    item_id: productId,
    item_name: productName,
    price: price,
    quantity: 1,
  }]
});
```

### 2. 수익 리포트
```sql
-- 일별 수익 리포트
SELECT 
  DATE(created_at) as date,
  platform,
  COUNT(*) as transactions,
  SUM(amount) as gross_revenue,
  SUM(amount * (1 - platform_fee)) as net_revenue
FROM purchases
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(created_at), platform
ORDER BY date DESC;

-- 상품별 판매 현황
SELECT 
  product_id,
  COUNT(*) as sales_count,
  SUM(tokens) as tokens_sold,
  SUM(amount) as revenue
FROM purchases
GROUP BY product_id
ORDER BY revenue DESC;
```

## 🚨 주의사항 및 팁

### 1. 정책 준수
- 앱 내에서 웹 결제 링크 제공 금지
- 앱 설명에 외부 결제 언급 금지
- 인앱결제 우회 시도 금지

### 2. 사용자 경험
- 구매 실패 시 명확한 안내
- 구매 내역 조회 기능 제공
- 환불 정책 명확히 표시

### 3. 기술적 고려사항
- 영수증 중복 검증 방지
- 트랜잭션 원자성 보장
- 구매 복원 기능 필수
- 네트워크 재시도 로직

이 가이드를 통해 안전하고 정책을 준수하는 인앱결제 시스템을 구축할 수 있습니다.