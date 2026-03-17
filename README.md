# Synthèse du Projet et du Travail Accompli

**Projet :** Plateforme "La Petite Maison de l'Épouvante" (Espace Communautaire)
**Candidat :** Lead Developer / Architecte Logiciel
**Bloc de Compétences :** Superviser et assurer le développement des applications logicielles
**Date :** 17 Mars 2026

---

## 1. Rappel des Exigences de l'Évaluation (Cahier des Charges)

La mission confiée consistait à superviser, structurer et réaliser la preuve de concept (POC) d'une nouvelle application logicielle pour l'entreprise, en respectant un haut niveau d'exigence technique et organisationnelle. 

Les trois piliers évalués étaient :
1.  **Élaborer le processus d'assurance qualité logicielle :** Définir des métriques (ISO 25010), formaliser les tests, et sécuriser le cycle de développement (DevSecOps).
2.  **Piloter le développement et le déploiement :** Recenser les compétences de l'équipe, schématiser et intégrer une chaîne de livraison continue (CI/CD), et prouver la disponibilité/montée en charge dans un environnement managé.
3.  **Maintenir et développer son expertise :** Expérimenter en bac à sable, développer le POC fonctionnel, valider l'architecture et rédiger un plan de remédiation sécurité.

---

## 2. Synthèse des Réalisations Techniques et Documentaires

Pour répondre à ces exigences, le projet a été découpé en phases pragmatiques. La totalité des critères de la grille d'évaluation a été couverte et validée par des preuves concrètes.

### A. Phase de Cadrage et Architecture (Expertise)
*   **Expérimentation ("Bac à sable") :** Comparaison et sélection justifiée de la pile technologique (NestJS pour la rigueur du typage, PostgreSQL pour la robustesse ACID couplée au JSONB, et Keycloak pour la fédération d'identités).
*   **Modélisation :** Réalisation d'un schéma d'architecture cible Cloud-Native (Kubernetes, Ingress Controller HTTPS, HPA) respectant les contraintes de souveraineté (Hébergement Europe) et d'accessibilité (RGAA pour le futur front-end).

### B. Phase de Développement du POC
*   **Fonctionnalité Métier :** Développement d'une API REST fonctionnelle permettant la soumission sécurisée d'un article pour l'espace d'échange communautaire.
*   **Sécurité ("Secure by Design") :** Intégration du standard OIDC (OpenID Connect) via Keycloak. Les routes sont fermées par défaut et nécessitent un jeton JWT valide. Validation stricte des données entrantes via des DTO (Data Transfer Objects).
*   **Observabilité :** Implémentation d'une journalisation structurée (Winston) pour monitorer l'activité de l'API.

### C. Phase d'Usine Logicielle et Qualité (CI/CD)
*   **Intégration Continue :** Mise en place d'un pipeline automatisé (GitHub Actions) validant le code à chaque soumission.
*   **Assurance Qualité (QA) :** Implémentation de tests automatisés (Unitaires et E2E via Jest). Le pipeline exécute le build, les tests, et un scan de sécurité dynamique (SCA via `npm audit`) avant de fabriquer l'image Docker finale (taux de succès de 100%, 0 faille critique détectée).
*   **Métriques :** Définition de 4 indicateurs qualité (Couverture de test, Temps de réponse, Sécurité des dépendances, Taux de succès CI) pour endiguer la dette technique.

### D. Phase de Déploiement Managé et Scalabilité (Orchestration)
*   **Infrastructure as Code :** Déploiement de l'API, de la base de données et du serveur d'authentification sur un cluster Kubernetes local (Minikube).
*   **Montée en charge démontrée :** Exécution d'un tir de charge (Artillery) de 1800 requêtes en 30 secondes. 
*   **Résilience prouvée :** Le Horizontal Pod Autoscaler (HPA) a parfaitement détecté la charge CPU (76%) et a automatiquement instancié un second serveur (Scale-Up). L'API a maintenu un taux d'erreur de 0% et un temps de réponse p95 de 15.3 millisecondes.

### E. Phase d'Audit et de Management
*   **Remédiation Sécurité :** Audit du POC et rédaction d'un plan d'action priorisé pour la V2 (Gestion des secrets via Vault, Rate Limiting, En-têtes de sécurité HTTP).
*   **Management d'équipe :** Cartographie des compétences des développeurs juniors et proposition d'un plan de formation de 4 jours sur l'orchestration Kubernetes et l'administration Keycloak.

---


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
