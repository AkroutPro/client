pipeline {
    agent any  // This will run the pipeline on any available agent

    parameters {
        string(name: 'BRANCH_NAME', defaultValue: 'main', description: 'Git branch to build')
    }

    environment {
        NODE_HOME = tool name: 'nodejs', type: 'NodeJS'
        PATH = "${NODE_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: "${params.BRANCH_NAME}", url: 'git@github.com:AkroutPro/client.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }

        stage('Build React App') {
            steps {
                script {
                    sh 'npm run build'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    sh 'npm test -- --watchAll=false'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh './deploy.sh'
                }
            }
        }
    }

    post {
        always {
            node('label') {  // Ensure you replace 'label' with the appropriate node label if needed
                cleanWs()
            }
        }

        success {
            echo 'Build and deployment successful!'
        }

        failure {
            echo 'Build or deployment failed.'
        }
    }
}
