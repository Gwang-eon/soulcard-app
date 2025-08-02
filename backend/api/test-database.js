// Supabase 데이터베이스 연결 테스트 API
export default async function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Supabase 환경변수 확인
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({
        success: false,
        message: 'Supabase 환경변수가 설정되지 않았습니다',
        missing: {
          url: !supabaseUrl,
          key: !supabaseKey
        },
        available_env: Object.keys(process.env).filter(key => 
          key.includes('SUPABASE') || key.includes('POSTGRES')
        )
      });
    }

    // Supabase 클라이언트 동적 import (서버사이드에서 안전)
    let supabase;
    try {
      const { createClient } = await import('@supabase/supabase-js');
      supabase = createClient(supabaseUrl, supabaseKey);
    } catch (importError) {
      // Supabase 패키지가 없으면 직접 PostgreSQL 연결 시도
      return res.status(200).json({
        success: false,
        message: '@supabase/supabase-js 패키지가 설치되지 않았습니다',
        note: 'npm install @supabase/supabase-js 를 실행하세요',
        env_check: {
          supabase_url: supabaseUrl ? '✅ 설정됨' : '❌ 없음',
          supabase_key: supabaseKey ? '✅ 설정됨' : '❌ 없음'
        }
      });
    }

    // 기본 연결 테스트
    const { data: connectionTest, error: connectionError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .limit(1);

    if (connectionError) {
      throw new Error(`연결 실패: ${connectionError.message}`);
    }

    // 토큰 패키지 테이블 확인 및 조회
    let packages = [];
    let tablesExist = false;
    
    try {
      const { data: packagesData, error: packagesError } = await supabase
        .from('token_packages')
        .select('*')
        .eq('is_active', true);
      
      if (packagesError) {
        // 테이블이 없는 경우
        if (packagesError.code === 'PGRST116' || packagesError.message.includes('does not exist')) {
          tablesExist = false;
        } else {
          throw packagesError;
        }
      } else {
        packages = packagesData || [];
        tablesExist = true;
      }
    } catch (tableError) {
      tablesExist = false;
    }

    // 사용자 프로필 테이블 확인
    let userProfilesExist = false;
    try {
      const { error: profileError } = await supabase
        .from('user_profiles')
        .select('id')
        .limit(1);
      
      userProfilesExist = !profileError;
    } catch (e) {
      userProfilesExist = false;
    }

    // 상담 기록 테이블 확인
    let readingsExist = false;
    try {
      const { error: readingsError } = await supabase
        .from('readings')
        .select('id')
        .limit(1);
      
      readingsExist = !readingsError;
    } catch (e) {
      readingsExist = false;
    }

    res.status(200).json({
      success: true,
      message: 'Supabase 데이터베이스 연결 성공! 🎉',
      database_info: {
        name: 'soulcard-db',
        url: supabaseUrl,
        connection_status: '✅ 연결됨'
      },
      tables_status: {
        token_packages: tablesExist ? '✅ 존재함' : '❌ 생성 필요',
        user_profiles: userProfilesExist ? '✅ 존재함' : '❌ 생성 필요',
        readings: readingsExist ? '✅ 존재함' : '❌ 생성 필요'
      },
      sample_data: {
        token_packages_count: packages.length,
        packages: packages.slice(0, 3) // 처음 3개만 표시
      },
      next_steps: tablesExist ? [
        '✅ 데이터베이스 스키마 완료',
        '🔄 Figma Make 컴포넌트 연결 준비됨',
        '🚀 프론트엔드 개발 시작 가능'
      ] : [
        '📝 Supabase SQL Editor에서 스키마 생성 필요',
        '📄 docs/deployment/SUPABASE_SETUP_CHECKLIST.md 참조',
        '🔧 테이블 생성 후 다시 테스트'
      ],
      timestamp: new Date().toISOString(),
      test_endpoints: {
        current: '/api/test-database',
        ai_reading: '/api/reading/single',
        status: '/api/status'
      }
    });

  } catch (error) {
    console.error('Supabase 테스트 오류:', error);
    
    res.status(500).json({
      success: false,
      message: 'Supabase 연결 실패',
      error: error.message,
      troubleshooting: [
        '1. Vercel 환경변수 확인',
        '2. Supabase 프로젝트 상태 확인',
        '3. 네트워크 연결 상태 확인',
        '4. API 키 권한 확인'
      ],
      timestamp: new Date().toISOString()
    });
  }
}