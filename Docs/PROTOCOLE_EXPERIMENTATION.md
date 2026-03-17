# Protocole d'Expérimentation (Bac à sable) et Choix Techniques

**Projet :** Plateforme "La Petite Maison de l'Épouvante"

**Rédacteur :** Lead Developer / Architecte Logiciel

**Date :** Mars 2026

## Contexte

Préalablement au développement du socle technique, une phase d'expérimentation en environnement isolé ("bac à sable") a été menée. L'objectif était d'évaluer la pertinence de plusieurs technologies critiques face aux contraintes du projet : intégration d'une équipe de développeurs juniors, exigences strictes de sécurité (e-commerce), et capacité à soutenir de fortes montées en charge.

Ce document synthétise les protocoles de tests, les résultats obtenus et les décisions d'architecture qui en découlent.

---

### Expérimentation 1 : Sélection du Framework Backend (Serveur d'API)
**Hypothèse :** L'écosystème Node.js/TypeScript est pertinent. Une comparaison entre Express.js (minimaliste) et NestJS (structuré) doit déterminer le meilleur outil pour encadrer le développement applicatif.

*   **Protocole :** Développement d'un point de terminaison d'API REST intégrant la validation stricte de données entrantes (Data Transfer Object) sur les deux frameworks.
*   **Résultats obtenus :** La mise en œuvre sous Express.js requiert l'agrégation manuelle de bibliothèques tierces (routage, validation, typage), générant une structure de code hétérogène. NestJS propose une architecture logicielle modulaire (contrôleurs, services, injecteurs de dépendances) nativement intégrée et fortement typée via TypeScript.
*   **Décision technique :** **Adoption de NestJS.** Sa rigueur architecturale réduit le risque de dette technique et fournit un cadre de travail standardisé, sécurisant ainsi la montée en compétences des développeurs juniors.

---

### Expérimentation 2 : Système de Gestion de Base de Données (SGBD)
**Hypothèse :** La plateforme nécessite le stockage de données hautement structurées (transactions commerciales) et semi-structurées (caractéristiques variables des articles d'échange). Évaluation de PostgreSQL (Relationnel) face à MongoDB (NoSQL orienté document).

*   **Protocole :** Modélisation conceptuelle et insertion d'un "Article d'échange" intégrant des métadonnées flexibles dans les deux systèmes.
*   **Résultats obtenus :** MongoDB offre une flexibilité immédiate pour les objets hétérogènes. Cependant, PostgreSQL démontre une capacité équivalente grâce à son type de colonne `JSONB`, tout en maintenant l'intégrité référentielle stricte et les transactions ACID.
*   **Décision technique :** **Adoption de PostgreSQL.** La fiabilité transactionnelle est non négociable pour le volet e-commerce futur. L'utilisation du type `JSONB` répond parfaitement au besoin de flexibilité de l'espace communautaire, évitant ainsi la complexité de maintenir deux SGBD distincts en production.

---

### Expérimentation 3 : Sécurisation et Gestion des Identités (IAM)
**Hypothèse :** Développer un système d'authentification interne présente un risque de vulnérabilité majeur (fuite de données, gestion des mots de passe). Test d'intégration d'un fournisseur d'identité tiers.

*   **Protocole :** Déploiement d'une instance Keycloak. Configuration d'un royaume (Realm), création d'un client et tentative de sécurisation d'une route NestJS via la validation de jetons JWT (JSON Web Tokens).
*   **Résultats obtenus :** L'intégration de la bibliothèque `@slickteam/nestjs-keycloak` a permis de sécuriser les points de terminaison en quelques lignes de configuration, externalisant totalement le traitement cryptographique et la gestion des mots de passe.
*   **Décision technique :** **Adoption de Keycloak.** L'effort d'intégration est largement compensé par la conformité immédiate aux standards de l'industrie (OAuth 2.0 / OpenID Connect) et l'application du principe de conception sécurisée ("Secure by Design").

---

### Expérimentation 4 : Orchestration et Scalabilité (Environnement Managé)
**Hypothèse :** L'utilisation de Docker Compose est adaptée au développement local, mais insuffisante pour garantir la haute disponibilité. Évaluation de Kubernetes (via Minikube) pour valider l'autoscaling dynamique.

*   **Protocole :** Création de manifestes Kubernetes pour l'API. Configuration d'un Horizontal Pod Autoscaler (HPA) déclenché au-delà de 50% de consommation CPU. Injection d'un trafic réseau intense (tir de charge de 1800 requêtes en 30 secondes) via l'outil Artillery.
*   **Résultats obtenus :** Le système de supervision interne (Metrics Server) a détecté un pic CPU de 76%. Le HPA a réagi de manière autonome en instanciant un second réplica du service NestJS. Le test de charge s'est conclu par un taux d'échec des requêtes de 0% et un temps de réponse critique (p95) maintenu sous les 20 millisecondes.
*   **Décision technique :** **Adoption de Kubernetes.** Cette expérimentation valide formellement la capacité de l'architecture à s'exécuter dans un environnement managé et démontre mathématiquement la résilience et la montée en charge de l'application face à un afflux massif de trafic.