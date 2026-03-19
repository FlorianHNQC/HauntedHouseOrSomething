# Cycle de Vie de Développement : Démarche DevSecOps

**Date :** 18 Mars 2026

**Statut :** Vision globale de la plateforme et implémentation POC.

---

## 1. Objectifs de la démarche

Intégration continue de la sécurité ("Shift-Left") à chaque étape du cycle de développement logiciel (SDLC). Le processus couvre les exigences de la vision globale de "La Petite Maison de l'Épouvante" (E-commerce, Espace Communautaire, Streaming VOD, Enchères temps réel) tout en s'appuyant sur l'infrastructure Cloud-Native européenne cible.

Le tableau ci-dessous détaille le processus DevSecOps. Les étapes marquées d'une étoile (⭐) sont appliquées et validées dans la Preuve de Concept (POC) du service Communauté.

## 2. Intégration de la Sécurité dans le SDLC

| Phase du Cycle (SDLC) | Objectif de la Phase globale | Mesures de Sécurité & Outils DevSecOps (Shift-Left) | Statut POC |
| :--- | :--- | :--- | :---: |
| **1. Planification** | Conception des Epics (E-commerce, VOD, Enchères) et modélisation architecturale. | • Modélisation des menaces (Threat Modeling) sur les flux financiers et temps réel (WebSockets).<br>• Conformité réglementaire : Hébergement Cloud Europe (RGPD) et normes d'accessibilité Front-end (RGAA). | ⭐ |
| **2. Développement** | Écriture du code source des microservices (NestJS). | • Analyse statique continue via l'IDE (ex: SonarLint).<br>• Hooks de pré-validation (ex: `gitleaks`) pour interdire la soumission de secrets (clés d'API, credentials).<br>• Règles de codage sécurisé pour le système de chat et d'enchères. | ⭐ |
| **3. Construction** | Compilation, conteneurisation et gestion des dépendances. | • Analyse de la composition logicielle (SCA) pour détecter les failles des paquets tiers (`npm audit`).<br>• Analyse statique (SAST) exécutée par le pipeline d'intégration continue (GitHub Actions). | ⭐ |
| **4. Tests** | Validation fonctionnelle, intégration et robustesse. | • Exécution des tests unitaires et E2E (Jest).<br>• Validation de la montée en charge (Load Testing via Artillery) pour garantir la disponibilité sous attaques (DDoS).<br>• Analyse dynamique (DAST) ciblée sur les endpoints de la future API E-commerce. | ⭐ |
| **5. Déploiement** | Livraison sur l'orchestrateur Kubernetes (Cloud Européen). | • Validation de sécurité des manifestes K8s (interdiction des privilèges `root` dans les conteneurs).<br>• Centralisation et terminaison du chiffrement TLS via l'Ingress Controller.<br>• Scan des images Docker avant leur instanciation. | ⭐ |
| **6. Opération** | Maintien en conditions opérationnelles et gestion des accès. | • Externalisation stricte de la gestion des identités (IAM) au serveur Keycloak (OAuth2 / OIDC).<br>• Intégration d'un module de détection de fraudes (variation anormale de prix, vendeurs suspects).<br>• Injection des secrets via HashiCorp Vault ou Kubernetes Secrets. | ⭐ (IAM) |
| **7. Supervision** | Surveillance des métriques, logs et événements de sécurité. | • Collecte et formatage des journaux d'application (Winston).<br>• Déclenchement automatisé de l'Autoscaler (HPA) en cas de surcharge CPU/RAM.<br>• Alerting automatisé sur les anomalies d'authentification (401/403) ou de fraude e-commerce. | ⭐ (HPA) |