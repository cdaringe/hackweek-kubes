#!groovy
pipeline {
    agent label:'docker'
    stages {
        stage('setup') {
            steps {
                sh 'docker-compose up -d'
            }
        }
        stage('test') {
            steps {
                sh 'curl http://localhost:6001/beep | grep bop'
                sh 'curl http://localhost:6002/beep | grep bop'
                sh 'curl http://localhost:6003/beep | grep bop'
            }
        }
    }
    post {
        always {
            echo 'Compose, down boy down!'
            sh 'docker-compose down'
        }
        success {
            echo 'Huzzah, it actually worked!'
        }
        failure {
            echo 'Nyet, again!'
        }
    }
}
