# Audit de Sécurité et Plan de Remédiation

**Date :** 18 Mars 2026

**Périmètre :** Version 1 (POC - Service Communauté) et projection sur l'architecture globale cible (V2/V3).

## 1. Pratiques de Sécurité Intégrées (Acquis du POC)

La version actuelle intègre nativement les mécanismes de défense suivants (approche *Secure by Design*) :
*   **Délégation IAM (Identity and Access Management) :** Authentification externalisée vers le serveur Keycloak (OpenID Connect). Les microservices ne gèrent et ne stockent aucun mot de passe.
*   **Filtrage strict des entrées :** Validation des Data Transfer Objects (DTO) via `class-validator` en mode liste blanche stricte (rejet automatique des champs non prévus pour contrer l'injection).
*   **Isolation des privilèges :** Exécution des processus applicatifs dans les images Docker sous un utilisateur non privilégié (`USER node`).
*   **Chiffrement en transit :** Terminaison TLS (HTTPS) centralisée au niveau de l'Ingress Controller du cluster Kubernetes.

## 2. Analyse des Risques et Vulnérabilités Potentielles

L'analyse de l'architecture cible (incluant l'e-commerce et le temps réel) couplée aux résultats des tests de charge (1800 requêtes absorbées) met en évidence les vulnérabilités potentielles suivantes :
*   **Épuisement des ressources (DDoS / Brute-force) :** Bien que l'Autoscaler (HPA) ait prouvé sa capacité à absorber la charge, une attaque applicative prolongée saturerait la base de données et générerait des coûts d'infrastructure cloud injustifiés.
*   **Exposition des secrets :** La configuration actuelle du POC injecte les variables sensibles (identifiants de bases de données, secrets clients OAuth) via des manifestes Kubernetes standard ou des fichiers `.env`.
*   **Vulnérabilités transactionnelles (V2) :** L'intégration planifiée des paiements et des enchères expose le système à de nouveaux vecteurs d'attaque complexes (ex: *Race conditions* sur les WebSockets, *Broken Access Control*).

## 3. Matrice de Remédiation Priorisée

Les actions correctives suivantes sont classées par niveau de criticité afin de sécuriser le passage en production de la V1 et de préparer les fondations de la V2.

| Criticité | Vecteur de Risque (Classification OWASP) | Préconisation Technique de Remédiation | Planification |
| :---: | :--- | :--- | :---: |
| **P1 (Critique)** | **A02:2021 - Cryptographic Failures**<br>Gestion non sécurisée des secrets d'infrastructure. | Déploiement d'un coffre-fort numérique (ex: **HashiCorp Vault** ou AWS Secrets Manager) couplé à l'External Secrets Operator sur Kubernetes. | Avant MEP V1 |
| **P2 (Majeur)** | **A04:2021 - Insecure Design**<br>Absence de limitation de débit (Rate Limiting) sur les API. | Intégration du module `@nestjs/throttler` pour limiter les requêtes par IP/minute, avec une politique stricte sur les routes d'authentification. | Avant MEP V1 |
| **P2 (Majeur)** | **A01:2021 - Broken Access Control**<br>Risques liés à l'intégrité des transactions futures. | Implémentation de scans dynamiques de sécurité (DAST, ex: OWASP ZAP) dans le pipeline CI/CD dédié au futur microservice E-commerce. | Sprint V2 |
| **P3 (Moyen)** | **A05:2021 - Security Misconfiguration**<br>Absence d'en-têtes HTTP de sécurité protecteurs. | Configuration de la bibliothèque `Helmet.js` (HSTS, X-Frame-Options, protection XSS) sur l'ensemble des points d'entrée de l'API Gateway. | Sprint V1 |