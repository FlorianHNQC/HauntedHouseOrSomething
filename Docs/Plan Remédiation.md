# Audit de Sécurité et Plan de Remédiation

**Projet :** Plateforme "La Petite Maison de l'Épouvante"
**Rédacteur :** Lead Developer / Architecte Logiciel
**Date :** 17 Mars 2026

## 1. Contexte et Périmètre de l'Audit

Ce document présente l'analyse sécuritaire de la version 1 (Preuve de Concept) de l'API "Service Communauté". L'objectif est de recenser les mécanismes de défense intégrés ("Secure by Design") et de prioriser les actions correctives à mener sur l'infrastructure et le code applicatif avant le passage en production (V2).

## 2. Pratiques de Sécurité Intégrées (Acquises)

Conformément à notre démarche DevSecOps, l'architecture actuelle implémente nativement les lignes de défense suivantes :

1.  **Délégation de l'Authentification (IAM) :** Le service ne gère aucun identifiant. La vérification des accès est déléguée au serveur d'identité Keycloak via le standard OpenID Connect, prévenant ainsi les risques de fuite de base de données d'identifiants.
2.  **Filtrage Strict et Validation des Entrées :** Implémentation de validateurs de données (DTO) couplés à un `ValidationPipe` global. Le système rejette systématiquement les requêtes contenant des champs non prévus (Mode "Whitelist" et "ForbidNonWhitelisted"), neutralisant les tentatives d'injection.
3.  **Isolation des Privilèges Conteneur :** Les descripteurs de déploiement (Dockerfiles) forcent l'exécution du processus applicatif sous un utilisateur restreint (`USER node`), limitant la surface d'attaque en cas de compromission du conteneur.
4.  **Analyse Statique en Intégration Continue (SCA) :** Le pipeline GitHub Actions intègre un point de contrôle bloquant (`npm audit --audit-level=high`) prévenant le déploiement de dépendances tierces vulnérables.
5.  **Chiffrement en Transit (Architecture) :** Le déploiement sur l'orchestrateur Kubernetes est conçu pour s'appuyer sur un `Ingress Controller` centralisant la terminaison TLS (HTTPS), protégeant ainsi les flux de données contre l'interception.

## 3. Plan d'Action et Recommandations Priorisées

Malgré ces fondations, l'audit révèle des axes d'amélioration nécessaires pour une mise en production commerciale. Les actions sont classées par niveau de criticité.

| Criticité | Risque Identifié (Référentiel OWASP) | Préconisation de Remédiation | Statut |
| :---: | :--- | :--- | :--- |
| **P1 (Critique)** | **Gestion des secrets non sécurisée :** Les mots de passe (Base de données, Secret Client Keycloak) sont actuellement injectés en clair via les manifestes de déploiement ou des fichiers d'environnement. | Intégrer un système de gestion des secrets externe (ex: **HashiCorp Vault** ou AWS Secrets Manager) et configurer l'External Secrets Operator sur le cluster Kubernetes. | Planifié (V2) |
| **P2 (Majeur)** | **Absence de limitation de débit (Rate Limiting) :** Les points de terminaison publics sont exposés aux attaques par déni de service applicatif (DDoS) et au brute-force. | Intégrer et configurer le module `@nestjs/throttler` pour restreindre le nombre de requêtes autorisées par adresse IP sur une fenêtre de temps donnée. | Planifié (V2) |
| **P3 (Moyen)** | **En-têtes HTTP de sécurité manquants :** L'API ne force pas les politiques de sécurité du navigateur (HSTS, prévention du Clickjacking ou du XSS). | Déployer la bibliothèque `Helmet.js` dans la configuration d'amorçage (`main.ts`) du serveur NestJS. | Planifié (V2) |

**Conclusion de l'audit :** 
L'application dispose d'une architecture structurellement sécurisée. Le plan de remédiation du prochain sprint (V2) devra se concentrer en priorité sur la gestion cryptographique des secrets d'infrastructure afin de verrouiller totalement la chaîne de déploiement.