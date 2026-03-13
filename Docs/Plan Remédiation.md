# Audit de Sécurité et Plan de Remédiation

**Projet :** Plateforme "La Petite Maison de l'Épouvante"
**Rédacteur :** Lead Developer / Architecte Logiciel
**Date :** 13 Mars 2026

Ce document présente l'analyse de sécurité de la version 1 (POC) de l'API Communauté. Il recense les bonnes pratiques déjà implémentées ("Secure by Design") et priorise les actions correctives à mener avant une mise en production massive.

## 1. Bonnes pratiques de sécurité intégrées au POC (Déjà acquises)

Conformément à notre démarche DevSecOps, la version actuelle intègre nativement plusieurs barrières de sécurité :

1.  **Gestion centralisée des identités (IAM) :** L'authentification n'est pas gérée par l'API mais déléguée à **Keycloak** via le standard OpenID Connect. Les mots de passe ne transitent jamais par notre backend.
2.  **Filtrage strict des entrées (Validation/Sanitization) :** Utilisation de `class-validator` et du `ValidationPipe` global configuré en mode `whitelist: true` et `forbidNonWhitelisted: true`. Toute requête contenant des champs non prévus est automatiquement rejetée (protection contre l'injection).
3.  **Isolation des privilèges Docker :** Le `Dockerfile` est configuré pour exécuter l'application sous un utilisateur restreint (`USER node`) plutôt qu'en `root`, limitant l'impact d'une éventuelle compromission du conteneur.
4.  **Shift-Left Security :** Intégration d'une étape de scan de vulnérabilités (`npm audit --audit-level=high`) bloquante dans le pipeline GitHub Actions.

## 2. Analyse des vulnérabilités potentielles et Plan d'Action priorisé

Malgré ces fondations solides, l'audit du POC révèle des axes d'amélioration. Voici le plan de remédiation priorisé (Criticité P1 = Bloquant pour la Prod) :

| Criticité | Vulnérabilité / Risque identifié | Préconisation de Remédiation | Statut |
| :---: | :--- | :--- | :--- |
| **P1 (Critique)** | **Gestion des secrets en clair :** Le fichier `.env` est exclu du dépôt, mais les variables (mot de passe DB) devront être injectées de manière sécurisée en production. | Utiliser les **Kubernetes Secrets** ou un gestionnaire de coffre-fort comme **HashiCorp Vault** pour injecter les variables à l'exécution. | À faire (V2) |
| **P1 (Critique)** | **Manque de chiffrement en transit :** Les communications internes au cluster pourraient être interceptées. | Mettre en place un **Ingress Controller avec cert-manager** pour forcer une terminaison TLS (HTTPS) sur tous les points d'entrée. | À faire (V2) |
| **P2 (Majeur)** | **Absence de limitation de débit (Rate Limiting) :** L'API est vulnérable aux attaques par déni de service (DDoS) ou au brute-force sur les routes publiques. | Intégrer le module `@nestjs/throttler` pour limiter le nombre de requêtes autorisées par IP et par minute. | À faire (V2) |
| **P3 (Moyen)** | **En-têtes HTTP de sécurité manquants :** L'application n'envoie pas les en-têtes prévenant le Clickjacking ou le XSS. | Activer la librairie `Helmet` dans le fichier `main.ts` de NestJS. | À faire (V2) |

**Conclusion :** 
L'application est structurellement saine. La priorité pour le sprint suivant sera la configuration de l'infrastructure Kubernetes (Ingress/Secrets) pour envelopper cette API d'une couche réseau sécurisée.