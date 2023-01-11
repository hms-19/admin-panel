#!/bin/bash
rm -rf ./build/;
yarn run build;
cd ./build/;
echo taring;
echo ======;
tar zcvf build.tar.gz *;
ls;
echo uploading;
echo =========;
scp -i ~/.server_ssh/gamifly_admin_panel.pem ./build.tar.gz ubuntu@ec2-34-227-94-213.compute-1.amazonaws.com:.;
echo deploying;
echo =========;
ssh -i ~/.server_ssh/gamifly_admin_panel.pem  ubuntu@ec2-34-227-94-213.compute-1.amazonaws.com 'cd /var/www/gamifly-admin-panel/; sudo rm *; sudo mv ~/build.tar.gz .; sudo tar xvf ./build.tar.gz; sudo rm build.tar.gz;';
echo deploying finished;
echo ==================;
cd ..;
