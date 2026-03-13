# Feuille de Route Stratégique : Projet "La Petite Maison de l'Épouvante"

**Objectif :** Valider le bloc de compétences "Superviser et assurer le développement des applications logicielles" (Cible : Grade A - 16 à 20 points).
**Rôle :** Lead Developer / Architecte Logiciel.

## Phase 1 : Conception, Stratégie et Cadrage (Travail Préparatoire)
*Cette phase sécurise les fondations théoriques et justifie les choix techniques.*

*   **Tâche 1.1 : Définition du Backlog Fonctionnel**
    *   *Action :* Rédiger la User Story principale du POC ("Proposition d'un article à l'échange communautaire") avec ses critères d'acceptation.
    *   *Livrable :* Document `BACKLOG.md`.
*   **Tâche 1.2 : Cartographie des Compétences et Formation**
    *   *Action :* Évaluer l'équipe (1 Lead, 2 Juniors) face aux besoins Cloud-Native et proposer un plan d'action.
    *   *Livrable :* Document `PLAN_FORMATION.md` *(Terminé et validé)*.
*   **Tâche 1.3 : Formalisation du Cycle DevSecOps**
    *   *Action :* Définir les mesures de sécurité "Shift-Left" appliquées à chaque étape du SDLC.
    *   *Livrable :* Document `CYCLE_DEVSECOPS.md` *(Terminé et validé)*.
*   **Tâche 1.4 : Protocole d'Expérimentation ("Bac à Sable")**
    *   *Action :* Justifier l'adoption de NestJS (vs Express), PostgreSQL (vs MongoDB) et Keycloak, en fonction du contexte de l'équipe et des besoins de l'entreprise.
    *   *Livrable :* Document `PROTOCOLE_EXPERIMENTATION.md`.
*   **Tâche 1.5 : Modélisation de l'Architecture**
    *   *Action :* Produire le schéma d'architecture cible incluant les contraintes géographiques (Hébergement Europe), légales (RGAA), sécuritaires (HTTPS/Keycloak) et de scalabilité (HPA).
    *   *Livrable :* Schéma d'architecture (Format image) *(Terminé et validé)*.

## Phase 2 : Implémentation du Socle Technique (Développement du POC)
*Cette phase démontre la capacité à produire un code structuré, sécurisé et observable.*

*   **Tâche 2.1 : Initialisation de l'Environnement de Développement**
    *   *Action :* Générer le projet NestJS. Configurer un fichier `docker-compose.yml` local pour instancier la base de données (PostgreSQL) et le gestionnaire d'identités (Keycloak).
*   **Tâche 2.2 : Développement de la Fonctionnalité Métier**
    *   *Action :* Implémenter le contrôleur et le service applicatif (ex: `POST /api/echanges/articles`). Intégrer la communication avec PostgreSQL via un ORM (TypeORM ou Prisma).
*   **Tâche 2.3 : Sécurisation et Observabilité de l'API**
    *   *Action :* Intégrer la validation des jetons JWT (Keycloak) pour protéger la route métier. Mettre en place une journalisation structurée (logs applicatifs via la librairie Winston) pour tracer les requêtes.

## Phase 3 : Assurance Qualité et Intégration Continue (CI/CD)
*Cette phase valide les compétences en ingénierie logicielle et automatisation.*

*   **Tâche 3.1 : Définition de la Stratégie d'Assurance Qualité**
    *   *Action :* Définir 4 indicateurs basés sur la norme ISO 25010 (ex: couverture de code, temps de réponse) et leur impact sur la dette technique. Formaliser l'approche de test.
    *   *Livrables :* Documents `INDICATEURS_QUALITE.md` et `STRATEGIE_TEST.md`.
*   **Tâche 3.2 : Implémentation des Tests Automatisés**
    *   *Action :* Coder au minimum deux types de tests : Tests unitaires (isolation des services) et Tests d'intégration/E2E (validation de la route API complète).
*   **Tâche 3.3 : Conception du Pipeline CI/CD**
    *   *Action :* Rédiger le fichier de configuration (GitLab CI ou GitHub Actions) incluant les étapes : Build, Test, Scan de vulnérabilités (`npm audit` / Trivy), et Packaging (création de l'image Docker).
    *   *Livrable :* Schéma du pipeline CI/CD et fichier `.gitlab-ci.yml` ou `.github/workflows/main.yml`.

## Phase 4 : Déploiement Orchestré, Scalabilité et Audit
*Cette phase justifie les points les plus techniques de la grille d'évaluation (Environnement managé, montée en charge, remédiation).*

*   **Tâche 4.1 : Déploiement sur Orchestrateur (Minikube)**
    *   *Action :* Écrire les manifestes Kubernetes (`Deployment`, `Service`). Configurer un `Ingress Controller` pour assurer la terminaison HTTPS (sécurité minimale). Configurer un `Horizontal Pod Autoscaler` (HPA) pour la gestion de la charge.
*   **Tâche 4.2 : Test de Montée en Charge**
    *   *Action :* Exécuter un tir de charge (via JMeter ou K6) contre l'API déployée.
    *   *Livrable :* Captures d'écran et extraction des métriques prouvant le déclenchement du HPA (création automatique de nouveaux pods) et le maintien de la disponibilité.
*   **Tâche 4.3 : Audit et Plan de Remédiation Sécurité**
    *   *Action :* Analyser les résultats des tests et l'architecture du POC. Rédiger des préconisations d'amélioration sécuritaire (ex: gestion des secrets K8s, analyse DAST approfondie).
    *   *Livrable :* Document `PLAN_REMEDIATION.md`.

## Phase 5 : Préparation de la Soutenance
*Phase de restitution et de valorisation du travail accompli.*

*   **Tâche 5.1 : Création du Support de Présentation**
    *   *Action :* Élaborer un diaporama épuré, axé sur les schémas d'architecture et les processus (CI/CD, DevSecOps), destiné à une audience de spécialistes techniques.
*   **Tâche 5.2 : Enregistrement de la Démonstration (Secours)**
    *   *Action :* Réaliser une capture vidéo fluide démontrant l'authentification (Keycloak), le fonctionnement de l'API, et surtout la réaction de l'orchestrateur (HPA) lors du test de charge.
*   **Tâche 5.3 : Répétition Chronométrée**
    *   *Action :* Calibrer le discours pour respecter scrupuleusement le format exigé (20 minutes d'exposé).