#!/bin/bash

G_CLIENT_ID=$(aws ssm get-parameter --name "G_CLIENT_ID" --with-decryption --query "Parameter.Value" --output text)
G_CLIENT_SECRET=$(aws ssm get-parameter --name "G_CLIENT_SECRET" --with-decryption --query "Parameter.Value" --output text)
DB_ID=$(aws ssm get-parameter --name "DB_ID" --with-decryption --query "Parameter.Value" --output text)
DB_SECRET=$(aws ssm get-parameter --name "DB_SECRET" --with-decryption --query "Parameter.Value" --output text)
OPENBANKING_URL=$(aws ssm get-parameter --name "OPENBANKING_URL" --with-decryption --query "Parameter.Value" --output text)
K_REDIRECT_URI=$(aws ssm get-parameter --name "K_REDIRECT_URI" --with-decryption --query "Parameter.Value" --output text)
K_CLIENT_ID=$(aws ssm get-parameter --name "K_CLIENT_ID" --with-decryption --query "Parameter.Value" --output text)
K_CLIENT_SECRET=$(aws ssm get-parameter --name "K_CLIENT_SECRET" --with-decryption --query "Parameter.Value" --output text)

BUILD_JAR=$(ls /home/ubuntu/action/build/libs/tikkle-0.0.1-SNAPSHOT.jar)
JAR_NAME=$(basename $BUILD_JAR)

echo "> 현재 시간: $(date)" >> /home/ubuntu/action/deploy.log

echo "> build 파일명: $JAR_NAME" >> /home/ubuntu/action/deploy.log

echo "> build 파일 복사" >> /home/ubuntu/action/deploy.log
DEPLOY_PATH=/home/ubuntu/action/
cp $BUILD_JAR $DEPLOY_PATH

echo "> 현재 실행중인 애플리케이션 pid 확인" >> /home/ubuntu/action/deploy.log
CURRENT_PID=$(pgrep -f $JAR_NAME)

if [ -z $CURRENT_PID ]
then
  echo "> 현재 구동중인 애플리케이션이 없으므로 종료하지 않습니다." >> /home/ubuntu/action/deploy.log
else
  echo "> kill -9 $CURRENT_PID" >> /home/ubuntu/action/deploy.log
  sudo kill -9 $CURRENT_PID
  sleep 5
fi


DEPLOY_JAR=$DEPLOY_PATH$JAR_NAME
echo "> DEPLOY_JAR 배포"    >> /home/ubuntu/action/deploy.log
sudo nohup java -jar -Dspring.profiles.active=prod $DEPLOY_JAR >> /home/ubuntu/deploy.log 2>/home/ubuntu/action/deploy_err.log &
