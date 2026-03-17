# Documentation Technique - Preuve de Concept (POC)
**Projet :** Plateforme "La Petite Maison de l'Épouvante"
**Date :** Mars 2026

## 1. Contexte et Objectifs

Ce dépôt contient le code source et les manifestes d'infrastructure de la version 1 (Preuve de Concept) de l'API "Service Communauté". L'objectif de ce POC est de valider les choix architecturaux majeurs pour la refonte du système d'information de l'entreprise, en se concentrant sur :
*   Le découpage applicatif orienté microservices.
*   La sécurisation des accès via un fournisseur d'identité externe (Keycloak).
*   Le déploiement automatisé et la haute disponibilité au sein d'un environnement managé (Kubernetes).

## 2. Architecture Technique

La solution repose sur une pile technologique Cloud-Native :
*   **API Backend :** NestJS (TypeScript) garantissant une structure modulaire stricte.
*   **Base de Données :** PostgreSQL, assurant la cohérence transactionnelle (ACID) avec la flexibilité du type JSONB.
*   **Gestion des Identités (IAM) :** Keycloak (Standard OpenID Connect / OAuth 2.0).
*   **Orchestration :** Kubernetes (simulé localement via Minikube) gérant l'autoscaling (HPA) et le routage sécurisé (Ingress).
*   **Intégration Continue (CI/CD) :** GitHub Actions (Build, Tests unitaires/E2E, Audit de sécurité SCA, Packaging Docker).

*Note : Le schéma d'architecture cible est disponible dans le dossier `/Docs`.*

## 3. Prérequis Système

Pour déployer ce POC sur un environnement local, les outils suivants doivent être installés :
*   Docker Engine
*   Minikube
*   kubectl (Outil en ligne de commande Kubernetes)

## 4. Procédure de Déploiement Local (Minikube)

Le déploiement s'effectue intégralement via des manifestes Kubernetes déclaratifs.

### Étape 4.1 : Initialisation du cluster
Démarrage du cluster local et activation des modules complémentaires nécessaires au routage et à la collecte des métriques (indispensable pour l'autoscaling).
```bash
minikube start
minikube addon enable ingress
minikube addon enable metrics-server
```

### Étape 4.2 : Construction de l'image applicative
Afin d'éviter l'utilisation d'un registre d'images externe, l'image Docker de l'API est compilée directement au sein du démon Docker de Minikube.
```bash
# Redirection du contexte Docker vers Minikube
eval $(minikube docker-env)

# Construction de l'image depuis la racine du projet
docker build -t maison-epouvante-api:latest ./service-communaute
```

### Étape 4.3 : Déploiement de l'infrastructure
Application des manifestes Kubernetes incluant les bases de données, le serveur d'authentification, l'API métier et les règles d'autoscaling (HPA).
```bash
kubectl apply -f k8s/deploiement-complet.yaml
```

### Étape 4.4 : Vérification de l'état du système
Surveillance du démarrage des Pods et de l'attribution des ressources :
```bash
kubectl get pods -w
kubectl get hpa
```
L'application est considérée comme opérationnelle lorsque l'ensemble des pods affichent le statut `Running`.

## 5. Accès et Tests

Une fois le cluster opérationnel, les services sont exposés via des ports NodePort ou via le tunnel Minikube.
*   **Serveur d'authentification Keycloak :** Exécuter `kubectl port-forward svc/keycloak-service 8080:8080`
*   **API Communauté :** Exécuter `kubectl port-forward svc/api-communaute-service 3000:3000`

La validation de la robustesse de l'infrastructure s'effectue via un test de charge (outil Artillery), démontrant le déclenchement du Horizontal Pod Autoscaler (HPA) au-delà de 50% d'utilisation CPU.
