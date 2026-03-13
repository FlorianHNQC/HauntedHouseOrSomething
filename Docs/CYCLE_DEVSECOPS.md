# Cycle de Vie de Développement : Démarche DevSecOps

**Projet :** Plateforme "La Petite Maison de l'Épouvante"
**Rédacteur :** Lead Developer / Architecte Logiciel
**Objectif :** Formaliser l'intégration continue de la sécurité ("Shift-Left") à chaque étape du cycle de développement logiciel (SDLC) afin de garantir l'intégrité et la résilience de la plateforme.

Le tableau ci-dessous détaille le processus DevSecOps cible. La colonne "Statut (V1)" précise les mesures appliquées dans le cadre de la preuve de concept actuelle.

| Phase du Cycle (SDLC) | Objectif de la Phase | Mesures de Sécurité & Outils DevSecOps | Statut (V1) |
| :--- | :--- | :--- | :--- |
| **1. Planification** | Définition des exigences et conception de l'architecture. | Modélisation des menaces (Threat Modeling). Intégration des contraintes RGPD (données utilisateurs) et RGAA (accessibilité Front-end). | Implémenté |
| **2. Développement** | Écriture du code source applicatif. | Utilisation d'outils d'analyse statique dans l'IDE (ex: SonarLint). Mise en place de hooks de pré-validation (ex: gitleaks) pour prévenir la compromission de secrets. Revues de code obligatoires. | Implémenté |
| **3. Construction** | Compilation, gestion des dépendances et conteneurisation. | Analyse statique de sécurité (SAST) via l'intégration continue. Analyse de la composition logicielle (SCA) pour détecter les vulnérabilités des dépendances (ex: npm audit). | Implémenté |
| **4. Tests** | Validation fonctionnelle, d'intégration et de sécurité dynamique. | Exécution automatisée des tests unitaires et d'intégration. Analyse dynamique (DAST) ciblée sur les environnements de pré-production. | Implémenté |
| **5. Déploiement** | Livraison applicative sur l'orchestrateur Kubernetes. | Validation de la configuration des manifestes (ex: interdiction des conteneurs privilégiés). Scan de vulnérabilités des images Docker avant déploiement. Terminaison TLS via Ingress Controller. | Implémenté |
| **6. Opération** | Exécution et maintien en condition opérationnelle. | Délégation stricte de la gestion des identités et des accès (IAM) à Keycloak via les protocoles OAuth2 / OpenID Connect. Application du principe de moindre privilège. | Implémenté |
| **7. Supervision** | Surveillance proactive de l'état de santé et des événements de sécurité. | Centralisation et formatage des journaux d'application (logs applicatifs). Configuration d'alertes sur les anomalies d'authentification (ex: codes HTTP 401/403 répétés). | Implémenté |

**Conclusion de l'analyse :** 
La version 1 de l'application intègre les standards de sécurité modernes. La délégation de l'authentification à un fournisseur d'identité tiers (Keycloak), l'isolation par conteneurs non privilégiés et l'analyse automatisée des dépendances couvrent les exigences de sécurité minimales requises pour le déploiement en environnement managé.