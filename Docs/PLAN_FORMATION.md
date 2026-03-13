# Cartographie des Compétences et Plan de Formation de l'Équipe

**Projet :** Plateforme "La Petite Maison de l'Épouvante"
**Rédacteur :** Lead Developer / Architecte Logiciel
**Date :** 13 Mars 2026

## 1. Contexte et Objectifs

L'équipe d'ingénierie dédiée à la refonte de la plateforme se compose actuellement d'un Lead Developer (Architecte) et de deux développeurs juniors disposant de cinq années d'expérience acquises en alternance. 

Le passage d'un système d'information hétérogène et fragmenté vers une architecture Cloud-Native orientée microservices nécessite d'évaluer les compétences actuelles de l'équipe afin de garantir la maintenabilité, la sécurité et l'évolutivité de la solution technique.

## 2. Cartographie et Évaluation des Compétences

La matrice ci-dessous évalue les compétences requises pour le projet sur une échelle de 1 (Débutant) à 3 (Expert/Référent).

| Domaine d'expertise technologique | Technologies concernées | Niveau Requis | Niveau du Lead Dev | Niveau des Juniors | Analyse de l'Écart (Gap) |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **Ingénierie Logicielle Backend** | TypeScript, NestJS, API REST | 3 | 3 | 2 | Mineur. Les bases algorithmiques et de programmation sont acquises. |
| **Gestion des Données** | PostgreSQL, ORM, modélisation relationnelle et flexible (JSONB) | 2 | 3 | 2 | Mineur. Un accompagnement interne sur l'optimisation des requêtes sera suffisant. |
| **Usine Logicielle (CI/CD)** | Pipelines automatisés, tests continus | 2 | 3 | 2 | Mineur. La montée en compétence s'effectuera par la pratique (pair-programming). |
| **Gestion des Identités (IAM)** | Keycloak, OAuth2, OpenID Connect | **2** | 3 | **1** | **Critique. Les concepts de fédération d'identité nécessitent un apprentissage spécifique.** |
| **Orchestration et Cloud-Native** | Docker, Kubernetes, Ingress, HPA | **2** | 3 | **1** | **Critique. Le paradigme du déploiement conteneurisé et orchestré n'est pas maîtrisé.** |

## 3. Analyse des Besoins et Stratégie de Montée en Compétences

Les développeurs juniors possèdent des fondations solides en développement applicatif, garantissant une productivité immédiate sur l'implémentation des fonctionnalités métier. Toutefois, l'analyse révèle un déficit critique concernant l'orchestration (Kubernetes) et la gestion de la sécurité externalisée (Keycloak). 

Afin de prévenir un risque de dépendance exclusive envers le Lead Developer (réduction du "Bus Factor") et d'assurer l'autonomie de l'équipe sur l'ensemble du cycle DevSecOps, une action de formation formelle est requise.

## 4. Proposition d'Action de Formation

L'absence de contrainte budgétaire permet de privilégier une formation intensive et qualitative.

*   **Intitulé de la formation :** Cursus d'Architecture Cloud-Native : Conteneurisation, Déploiement Kubernetes et Sécurité IAM.
*   **Public visé :** Les deux développeurs juniors.
*   **Format recommandé :** Formation intra-entreprise (présentiel ou distanciel synchrone) avec ateliers pratiques ciblés sur notre pile technologique.
*   **Durée estimée :** 4 jours (28 heures).
*   **Objectifs pédagogiques principaux :**
    1.  Maîtriser le cycle de vie des conteneurs applicatifs et l'optimisation des descripteurs de déploiement (Dockerfiles).
    2.  Administrer un cluster Kubernetes standard et y déployer des charges de travail (Pods, Services, Ingress Controllers, gestion des ConfigMaps et Secrets).
    3.  Comprendre les mécanismes d'authentification modernes (flux OAuth2 et OIDC).
    4.  Interfacer une application backend avec un serveur Keycloak pour la gestion des autorisations et la validation des jetons JWT.
*   **Retour sur investissement attendu :** Autonomie opérationnelle de l'équipe sur la mise en production sécurisée des futurs services de la plateforme.