#!groovy
node {
  stage('checkout') {
    checkout scm
  }
  stage('make er buck') {
    sh 'docker-compose up'
  }
  stage('test') {
    sh 'curl http://localhost:6001/beep | grep bop'
    sh 'curl http://localhost:6002/beep | grep bop'
    sh 'curl http://localhost:6003/beep | grep bop'
  }
}
