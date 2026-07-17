# Microservices Demo Application

A production-style microservices application built with **Node.js, TypeScript, Express, MongoDB, PostgreSQL, Docker, Kubernetes, AWS EKS, GitHub Actions, and NGINX Ingress**. The project demonstrates scalable service-oriented architecture, container orchestration, and automated CI/CD deployment.

---

# Architecture

```
                    +----------------------+
                    |      Client          |
                    +----------+-----------+
                               |
                               v
                    +----------------------+
                    |    NGINX Ingress     |
                    +----------+-----------+
                               |
                               v
                    +----------------------+
                    |     API Gateway      |
                    +----------+-----------+
                               |
                +--------------+--------------+
                |                             |
                v                             v
      +------------------+          +------------------+
      |   User Service   |          |  Order Service   |
      +--------+---------+          +--------+---------+
               |                             |
               v                             v
         +-----------+                 +-------------+
         | MongoDB   |                 | PostgreSQL  |
         +-----------+                 +-------------+
```

---

# Features

* Microservices architecture
* API Gateway
* Independent databases per service
* MongoDB for User Service
* PostgreSQL for Order Service
* Dockerized services
* Kubernetes deployments
* NGINX Ingress
* ConfigMaps & Secrets
* Rolling deployments
* GitHub Actions CI/CD
* Automatic Docker image build & push
* Deployment to Amazon EKS
* Image versioning using Git SHA

---

# Tech Stack

### Backend

* Node.js
* TypeScript
* Express.js

### Databases

* MongoDB
* PostgreSQL
* Prisma ORM

### DevOps

* Docker
* Kubernetes
* Amazon EKS
* Docker Hub
* GitHub Actions
* NGINX Ingress Controller

---

# Project Structure

```
.
├── api-gateway/
├── user-service/
├── order-service/
├── k8s/
│   ├── api-gateway/
│   ├── user/
│   ├── order/
│   ├── db/
│   └── ingress/
├── .github/
│   └── workflows/
└── README.md
```

---

# Services

## API Gateway

Responsibilities

* Routes incoming requests
* Central entry point
* Reverse proxy
* Request forwarding

---

## User Service

Responsibilities

* User management
* Authentication
* MongoDB integration

Database

* MongoDB

---

## Order Service

Responsibilities

* Order management
* PostgreSQL integration

Database

* PostgreSQL

---

# Running Locally

## Clone

```bash
git clone <repository-url>
cd microservice-application
```

## Build Docker Images

```bash
docker build -t api-gateway ./api-gateway
docker build -t user-service ./user-service
docker build -t order-service ./order-service
```

## Start Kubernetes Resources

```bash
kubectl apply -f k8s/db/
kubectl apply -f k8s/user/
kubectl apply -f k8s/order/
kubectl apply -f k8s/api-gateway/
kubectl apply -f k8s/ingress/
```

Check resources:

```bash
kubectl get pods
kubectl get svc
kubectl get ingress
```

---

# Environment Variables

### API Gateway

```env
PORT=
USER_SERVICE_URL=
ORDER_SERVICE_URL=
JWT_SECRET=
```

### User Service

```env
PORT=
MONGODB_URI=
JWT_SECRET=
```

### Order Service

```env
PORT=
DATABASE_URL=
USER_SERVICE_URL=
```

---

# CI/CD Pipeline

The project includes a GitHub Actions workflow that automatically:

* Builds Docker images
* Pushes images to Docker Hub
* Updates Kubernetes deployments
* Applies Kubernetes manifests
* Performs rolling updates
* Waits for successful rollout
* Rolls back automatically if deployment fails

Workflow:

```
Git Push
     │
     ▼
GitHub Actions
     │
     ▼
Docker Build
     │
     ▼
Docker Hub
     │
     ▼
Amazon EKS
     │
     ▼
Rolling Update
```

---

# Kubernetes Resources

* Deployment
* Service
* ConfigMap
* Secret
* Ingress

---

# Useful Commands

Pods

```bash
kubectl get pods
```

Deployments

```bash
kubectl get deployments
```

Services

```bash
kubectl get svc
```

Logs

```bash
kubectl logs deployment/user-deployment

kubectl logs deployment/order-deployment

kubectl logs deployment/gateway-deployment
```

Restart Deployment

```bash
kubectl rollout restart deployment/user-deployment
```

Check Rollout Status

```bash
kubectl rollout status deployment/user-deployment
```

Rollback

```bash
kubectl rollout undo deployment/user-deployment
```

---

# Future Improvements

* RabbitMQ/Kafka event-driven communication
* Service Mesh (Istio/Linkerd)
* Distributed tracing
* Prometheus & Grafana monitoring
* Centralized logging with ELK/OpenSearch
* Horizontal Pod Autoscaler
* Helm charts
* Argo CD GitOps deployment

---

# Learning Outcomes

This project demonstrates practical experience with:

* Microservices architecture
* REST APIs
* Docker containerization
* Kubernetes orchestration
* Database-per-service pattern
* API Gateway pattern
* Kubernetes Secrets & ConfigMaps
* CI/CD using GitHub Actions
* Amazon EKS deployment
* Rolling updates and rollback strategy

---

# License

This project is intended for learning and portfolio purposes.