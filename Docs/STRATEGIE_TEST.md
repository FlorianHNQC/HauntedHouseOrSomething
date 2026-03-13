# Stratégie de Test et Assurance Qualité

**Projet :** Plateforme "La Petite Maison de l'Épouvante"
**Rédacteur :** Lead Developer / Architecte Logiciel

Ce document formalise la stratégie de validation logicielle appliquée au périmètre du POC (Service Communauté), garantissant ainsi la conformité de l'application avant tout déploiement.

## 1. Typologie des tests mis en œuvre

Conformément à la pyramide des tests, le processus intègre deux niveaux de validation distincts pour le POC :

### A. Tests Unitaires (Logique Métier Isolée)
*   **Périmètre :** Les méthodes individuelles des classes de type `Service` (ex: `CommunauteService`).
*   **Outil associé :** Jest (Framework de test Node.js).
*   **Parties prenantes :** Développeurs.
*   **Objectif :** Valider l'algorithmique interne de l'application en isolant le code de ses dépendances externes (la base de données PostgreSQL est simulée par des "Mocks").

### B. Tests d'Intégration / End-to-End (E2E)
*   **Périmètre :** Les points de terminaison de l'API (ex: la route `POST /api/echanges/articles`).
*   **Outil associé :** Jest couplé à Supertest.
*   **Parties prenantes :** Développeurs et Lead Developer (pour la validation des critères d'acceptation).
*   **Objectif :** Simuler une requête HTTP entrante et vérifier que l'ensemble de la chaîne (Validation du DTO -> Contrôleur -> Service -> Enregistrement en Base de données) fonctionne de manière synchrone et cohérente.

## 2. Intégration au cycle de vie (CI/CD)

Afin d'automatiser cette stratégie et d'interdire toute régression, l'exécution de ces deux typologies de tests est rendue obligatoire à chaque soumission de code (Pull Request). 

Le pipeline d'intégration continue est configuré pour faire échouer le processus de "Build" si un seul de ces tests ne retourne pas un code de succès. Les rapports générés servent à alimenter nos indicateurs de qualité (Couverture de code).