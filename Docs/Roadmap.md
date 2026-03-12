### 🗺️ ROADMAP DU PROJET : "La Petite Maison de l'Épouvante"

#### **Étape 1 : Cadrage et Expérimentation (Bac à sable) ⏳ *À faire en premier***
*L'objectif est de figer les choix techniques sans dépenser d'argent, en pensant à votre équipe de juniors.*

*   **Action 1.1 : Le Backlog (User Story).** Rédigez formellement la fonctionnalité du POC : *"En tant qu'utilisateur authentifié, je peux soumettre un article horrifique/fantastique (titre, description) pour l'espace d'échange communautaire."*
*   **Action 1.2 : Protocole d'expérimentation en bac à sable (`PROTOCOLE_EXPERIMENTATION.md`).**
    *   *Test 1 :* NestJS vs Express (Justification : NestJS impose une structure stricte, idéale pour encadrer vos 2 développeurs juniors).
    *   *Test 2 :* PostgreSQL vs MongoDB (Justification : Postgres est robuste pour le futur e-commerce, et gère le JSON pour la flexibilité des articles de troc).
    *   *Test 3 :* Minikube (Justification : Test de déploiement local simulant un vrai cluster Kubernetes sans frais Cloud).
*   **Action 1.3 : Schéma d'Architecture.** Dessinez le schéma cible : Front-end (virtuel pour le POC) ➔ API Gateway / Ingress ➔ Service Communauté (NestJS) ➔ BDD (Postgres) + Serveur d'Auth (Keycloak).
🎯 **Points visés : 2 pts (Expérimentation) + Préparation pour les 4 pts d'Architecture.**

#### **Étape 2 : Développement du POC (Le cœur du métier) ⏳ *Le plus gros du travail technique***
*On implémente l'architecture validée.*

*   **Action 2.1 : Initialisation NestJS & Keycloak.**
    *   Générez le projet NestJS.
    *   Montez un conteneur Docker Keycloak localement. Créez un "Realm" *MaisonEpouvante* et un utilisateur de test.
*   **Action 2.2 : Développement de la route métier.**
    *   Codez le endpoint `POST /api/echanges/articles`.
    *   Connectez-le à PostgreSQL (via TypeORM ou Prisma).
    *   Protégez la route avec un Guard NestJS lié à Keycloak (l'utilisateur doit avoir un token JWT valide).
*   **Action 2.3 : Observabilité basique.** Intégrez un logger (ex: `winston` sur NestJS) pour tracer les appels API dans la console (cela valide le critère "composante de l'observabilité").
🎯 **Points visés : 4 pts (Implémentation architecture) + 1 pt (Fonctionnalité métier). Cumul potentiel : 7/20.**

#### **Étape 3 : Assurance Qualité & Tests ⏳ *La preuve que votre code est robuste***
*Un Lead Dev ne livre pas sans tests.*

*   **Action 3.1 : Rédaction de `STRATEGIE_TEST.md`.** Formalisez l'utilisation de Jest pour l'unitaire et l'E2E.
*   **Action 3.2 : Implémentation des tests.**
    *   Écrivez au moins 2 tests unitaires (ex: tester le service qui formate les données de l'article).
    *   Écrivez 1 test d'intégration/E2E (ex: simuler l'appel à la route `POST` et vérifier que la base de données est modifiée).
*   **Action 3.3 : Définition de `INDICATEURS_QUALITE.md`.** Listez 4 métriques ISO 25010 pertinentes (ex: 1. Couverture de code > 80% [Maintenabilité], 2. Temps de réponse < 200ms [Performance], 3. Zéro faille critique au scan npm [Sécurité], 4. Taux de succès des builds [Fiabilité]). Expliquez comment cela évite la dette technique.
🎯 **Points visés : 2 pts (Processus de tests) + 1 pt (Indicateurs). Cumul potentiel : 10/20.**

#### **Étape 4 : CI/CD et Déploiement Orchestré ⏳ *L'automatisation à 0€***
*C'est ici qu'on valide la compétence DevOps.*

*   **Action 4.1 : Pipeline CI/CD.** Créez un fichier GitHub Actions (`.github/workflows/main.yml`) ou GitLab CI.
    *   *Étapes du pipeline :* Build de l'app ➔ Exécution des tests Jest ➔ Scan de vulnérabilités (`npm audit`) ➔ Création de l'image Docker.
*   **Action 4.2 : Schématisation CI/CD.** Faites un diagramme propre de ce pipeline pour votre présentation (`SCHEMA_CICD.png`).
*   **Action 4.3 : Déploiement local (Minikube ou Docker Compose).**
    *   Créez les fichiers de déploiement pour faire tourner le POC, Postgres et Keycloak ensemble sur votre machine. L'utilisation de **Minikube** (Kubernetes local) est fortement recommandée pour cocher parfaitement la case "orchestrateur" du sujet.
🎯 **Points visés : 3 pts (CI/CD) + 2 pts (Environnement managé/Montée en charge - *la montée en charge sera prouvée en soutenance*). Cumul potentiel : 15/20 (Grade B sécurisé !).**

#### **Étape 5 : Analyse de Sécurité et Management d'Équipe ⏳ *Les points de l'expertise Lead Dev***
*On prend de la hauteur sur le projet.*

*   **Action 5.1 : Audit et `PLAN_REMEDIATION_SECURITE.md`.**
    *   Analysez votre POC v1. Identifiez des failles (ex: Les secrets de base de données sont peut-être en clair dans un fichier config ? Il manque du HTTPS (TLS) en local ?).
    *   Proposez un plan d'action priorisé.
    *   Listez les 2 bonnes pratiques déjà intégrées (Auth déléguée à Keycloak + Scan npm dans la CI).
*   **Action 5.2 : Bilan de compétences (`PLAN_FORMATION.md`).**
    *   Constatez que vos 2 juniors viennent du monde de l'alternance et ne maîtrisent peut-être pas les microservices.
    *   Proposez une formation : *"Atelier de 3 jours : Conteneurisation et déploiement d'API NestJS sur Kubernetes pour développeurs juniors"*.
🎯 **Points visés : 2 pts (Remédiation) + 1 pt (Formation). Cumul potentiel : 18/20 (Grade A atteint !).**

#### **Étape 6 : Préparation de la Soutenance (Le Jour J) ⏳ *Ne pas trébucher sur la ligne d'arrivée***
*Le sujet précise qu'il s'agit d'une évaluation "technique" face à des "spécialistes".*

*   **Action 6.1 : Le Diaporama.** Limitez le texte. Mettez en valeur vos beaux schémas (Architecture, DevSecOps, CI/CD).
*   **Action 6.2 : La Démo Vidéo (CRUCIAL).** Le sujet le conseille explicitement : enregistrez votre écran montrant le POC en train de fonctionner (Keycloak, envoi de l'article) ET le test de charge. **Utilisez JMeter ou K6 en local** pour bombarder votre API (ex: 50 requêtes concurrentes) et filmez les résultats prouvant qu'elle tient la charge. Cela évite l'effet démo en direct.
*   **Action 6.3 : Chronométrage.** Répétez votre pitch pour qu'il dure exactement entre 18 et 20 minutes.
🎯 **Points visés : 1 pt (Supports) + 1 pt (Prestation orale). Cumul potentiel : 20/20.**

---
**💡 Conseil de pro pour démarrer tout de suite :**
Créez immédiatement l'arborescence de votre dossier de rendu avec tous les fichiers `.md` vides nommés comme indiqué ci-dessus. Cela vous fera un squelette psychologique du travail à accomplir !