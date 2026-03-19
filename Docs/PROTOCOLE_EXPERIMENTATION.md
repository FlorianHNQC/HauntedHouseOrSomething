# Protocole d'Expérimentation et Choix Techniques

**Date :** 18 Mars 2026

**Périmètre :** Validation du socle technologique global (E-commerce, Communauté, Temps Réel) via un POC ("Bac à sable").

## 1. Contexte et Objectifs

Préalablement au développement, une phase d'expérimentation en environnement isolé a été menée. L'objectif est d'évaluer la pertinence de plusieurs technologies critiques face aux contraintes du projet : encadrement d'une équipe de développeurs juniors, exigences strictes de sécurité (transactions e-commerce), et capacité à soutenir de fortes montées en charge (enchères, streaming).

## 2. Synthèse des Expérimentations

### Expérimentation 1 : Framework Backend (Serveur d'API)
*   **Hypothèse :** L'écosystème Node.js/TypeScript est retenu. Une comparaison entre Express.js (minimaliste) et NestJS (structuré) doit déterminer l'outil le plus adapté pour encadrer l'équipe.
*   **Protocole :** Développement d'un endpoint REST intégrant une validation stricte de données entrantes sur les deux frameworks.
*   **Résultats :** Express.js requiert l'agrégation manuelle de bibliothèques tierces, générant une structure de code hétérogène. NestJS propose une architecture logicielle modulaire (contrôleurs, services, injection de dépendances) nativement intégrée et fortement typée.
*   **Décision technique : Adoption de NestJS.** Sa rigueur architecturale réduit le risque de dette technique et fournit un cadre de travail standardisé sécurisant la montée en compétences des développeurs juniors.

### Expérimentation 2 : Système de Gestion de Base de Données (SGBD)
*   **Hypothèse :** La plateforme globale nécessite le stockage de données structurées (commandes e-commerce) et semi-structurées (articles d'échange communautaire). Évaluation de PostgreSQL (Relationnel) face à MongoDB (NoSQL).
*   **Protocole :** Modélisation conceptuelle et insertion d'un "Article d'échange" intégrant des métadonnées flexibles dans les deux systèmes.
*   **Résultats :** MongoDB offre une flexibilité immédiate. Cependant, PostgreSQL démontre une capacité équivalente grâce à son type de colonne `JSONB`, tout en maintenant l'intégrité référentielle stricte et les transactions ACID.
*   **Décision technique : Adoption de PostgreSQL.** La fiabilité transactionnelle est non négociable pour le volet e-commerce. Le type `JSONB` répond au besoin de flexibilité de l'espace communautaire, évitant la complexité d'opérer deux SGBD distincts en production.

### Expérimentation 3 : Sécurisation et Gestion des Identités (IAM)
*   **Hypothèse :** Développer un système d'authentification interne présente un risque de vulnérabilité majeur. Test d'intégration d'un fournisseur d'identité tiers (IAM).
*   **Protocole :** Déploiement d'une instance Keycloak. Configuration d'un royaume (Realm), création d'un client "Confidential" et sécurisation d'une route NestJS via la validation de jetons JWT.
*   **Résultats :** L'intégration a permis de sécuriser les endpoints en déportant totalement le traitement cryptographique et le stockage des mots de passe hors de la base de données métier.
*   **Décision technique : Adoption de Keycloak.** L'effort d'intégration initial garantit la conformité immédiate aux standards de l'industrie (OAuth 2.0 / OpenID Connect) et l'application du principe "Secure by Design".

### Expérimentation 4 : Orchestration et Scalabilité (Environnement Managé)
*   **Hypothèse :** Docker Compose est adapté au développement, mais insuffisant pour garantir la haute disponibilité requise par le cahier des charges. Évaluation de Kubernetes (via Minikube) pour valider l'élasticité de l'infrastructure.
*   **Protocole :** Déploiement de l'API sur Minikube. Configuration d'un Horizontal Pod Autoscaler (HPA) déclenché au-delà de 50% de consommation CPU. Injection d'un trafic réseau intense (1800 requêtes en 30 secondes) via l'outil de Load Testing Artillery.
*   **Résultats :** Le système de supervision (Metrics Server) a détecté un pic CPU de 76%. Le HPA a réagi de manière autonome en instanciant un second réplica du service NestJS. Le test s'est conclu par un taux d'échec de 0% et un temps de réponse p95 maintenu à 15.3 millisecondes.
*   **Décision technique : Adoption de Kubernetes.** L'expérimentation valide mathématiquement la résilience et la montée en charge de l'application face à un afflux massif de trafic. Docker Compose est relégué au strict environnement de développement local (Dev).