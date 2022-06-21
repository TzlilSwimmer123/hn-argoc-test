1. eksctl create cluster --name shimon2022jan7 --region eu-west-1 --fargate --asg-access --full-ecr-access --alb-ingress-access --auto-kubeconfig --write-kubeconfig --without-nodegroup
2. eksctl create fargateprofile --name hn-app --namespace hn-app --cluster shimon2022jan7 --region eu-west-1

[https://aws.amazon.com/premiumsupport/knowledge-center/eks-alb-ingress-controller-fargate/](https://aws.amazon.com/premiumsupport/knowledge-center/eks-alb-ingress-controller-fargate/)

helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
--set clusterName=shimon2022jan7 \
--set serviceAccount.create=false \
--set region=eu-west-1 \
--set vpcId=[vpc-0ceae66bd84e5e124](https://eu-west-1.console.aws.amazon.com/vpc/home?#vpcs:VpcId=vpc-0ceae66bd84e5e124;sort=VpcId) \
--set serviceAccount.name=aws-load-balancer-controller \
-n kube-system