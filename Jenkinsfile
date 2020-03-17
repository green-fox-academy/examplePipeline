pipeline {
  agent any
  environment {
    dockerhubrepo = "rdg5/examplepipeline"
    dockeruser = "dockeruser"
    image = ""
    appname = "examplePipeline"
    envname = "Examplepipeline-dev"
    bucketname = "elasticbeanstalk-eu-west-3-124429370407"
 }
  stages {
    stage('Install dependencies') {
      steps {
        sh 'npm i'
        sh 'echo "build is done"'
      }
    }
    stage('Deploy to dockerHub') {
      steps {
        script{
        image = docker.build("rdg5/examplepipeline")
        }
        script{
          docker.withRegistry('', "dockeruser"){
          image.push()
          }
        }
      }

    }
    stage('Deploy to ElasticBeanstalk') {
      steps {
        withAWS(credentials:"exampleid", region:"eu-west-3") {
          sh 'aws s3 cp ./dockerrun.aws.json s3://${bucketname}/dockerrun.aws.json'
          sh 'aws elasticbeanstalk create-application-version \
          --application-name "examplePipeline" \
          --source-bundle S3Bucket="${bucketname}",S3Key="dockerrun.aws.json" \
          --auto-create-application'
          sh 'aws elasticbeanstalk update-environment --application-name "examplePipeline" \
          --environment-name "examplepipeline-dev" '
        }
      }
    }
  }
}
