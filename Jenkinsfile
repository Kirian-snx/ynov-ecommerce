pipeline {
  agent { docker { image 'node:20-alpine' } }

  environment {
    NODE_ENV = 'test'
    SONAR_TOKEN = credentials('sonar-token')
  }

  triggers {
    pollSCM('H/5 * * * *')   // ou cron('H 2 * * *')
  }

  stages {
    stage('Install')  { steps { sh 'npm ci' } }
    stage('Lint')     { steps { sh 'npm run lint' } }
    stage('Test')     {
      steps {
        sh 'npm test -- --coverage'
      }
      post {
        always {
          junit 'reports/junit.xml'
          archiveArtifacts 'coverage/**'
        }
      }
    }
    stage('Deploy') {
      when { branch 'main' }
      steps { sh './deploy.sh' }
    }
  }

  post {
    success { echo '✅ Pipeline OK' }
    failure { mail to: 'team@x.io', subject: "❌ ${env.JOB_NAME}" }
  }
}
