# Cartographie des Compétences et Plan de Formation

**Date :** 18 Mars 2026

**Périmètre :** Transition vers l'architecture Cloud-Native (Microservices, Kubernetes, IAM).

## 1. Contexte de l'Équipe

L'équipe d'ingénierie de "La Petite Maison de l'Épouvante" est composée de :
*   **1 Lead Developer / Architecte** (Rôle actuel).
*   **2 Développeurs Juniors** (5 ans d'expérience cumulée en alternance).

L'évolution de l'infrastructure (monolithe historique vers microservices) et l'intégration de flux complexes (E-commerce, WebSockets, Sécurité OIDC) nécessitent une mise à niveau ciblée pour garantir l'autonomie de l'équipe.

## 2. Cartographie et Évaluation des Compétences

*Échelle d'évaluation : 1 (Notions/Débutant) - 2 (Autonome) - 3 (Expert/Référent)*

| Domaine d'Expertise | Technologies cibles | Niveau Requis | Niveau Lead Dev | Niveau Juniors | Écart (Gap) |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **Ingénierie Backend** | NestJS, TypeScript, API REST | 3 | 3 | 2 | **Faible**. Bases algorithmiques solides acquises en alternance. |
| **Bases de Données** | PostgreSQL (ACID / JSONB) | 2 | 3 | 2 | **Faible**. Autonomie sur le CRUD, besoin d'appui sur l'optimisation. |
| **Usine Logicielle** | GitHub Actions, CI/CD, Jest | 2 | 3 | 1.5 | **Moyen**. Montée en compétence réalisable en interne (Pair-programming). |
| **Gestion des Identités** | Keycloak, OAuth 2.0, OIDC | **2** | 3 | **1** | **Critique**. La fédération d'identité et les flux de tokens sont méconnus. |
| **Orchestration Cloud** | Kubernetes, Docker, HPA, Ingress | **2** | 3 | **1** | **Critique**. Le paradigme conteneurisé et le réseau K8s ne sont pas maîtrisés. |

## 3. Analyse des Écarts

Les développeurs juniors sont immédiatement opérationnels sur le développement des fonctionnalités métier (ex: Service Communauté). Cependant, la méconnaissance de l'orchestration (Kubernetes) et de la sécurisation déléguée (Keycloak) crée un risque de goulot d'étranglement ("Bus Factor" élevé centré sur le Lead Developer) lors des phases de déploiement et de configuration réseau.

## 4. Action de Formation Proposée

Afin de combler cet écart de manière efficace (le budget n'étant pas restrictif), une action de formation formelle est planifiée.

*   **Intitulé :** *Bootcamp Architecture Cloud-Native : Déploiement Kubernetes et Sécurité IAM.*
*   **Public visé :** Les 2 développeurs juniors.
*   **Format :** Formation intra-entreprise (Ateliers pratiques sur l'infrastructure du projet).
*   **Durée :** 4 jours (28 heures).
*   **Objectifs pédagogiques :**
    1. Conteneurisation avancée et optimisation des images Docker.
    2. Administration de base Kubernetes (Déploiements, Services, Ingress Controllers, Gestion des Secrets).
    3. Compréhension des protocoles OAuth 2.0 et OpenID Connect.
    4. Interfaçage sécurisé entre une API NestJS et un royaume Keycloak.
*   **Bénéfice attendu (ROI) :** Autonomie complète de l'équipe sur la chaîne de valeur, de l'écriture du code métier jusqu'à son déploiement sécurisé en production.