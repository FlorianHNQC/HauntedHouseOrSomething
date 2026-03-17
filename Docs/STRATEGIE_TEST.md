# Stratégie de Validation et Processus de Test

**Projet :** Plateforme "La Petite Maison de l'Épouvante"
**Rédacteur :** Lead Developer / Architecte Logiciel

Ce document définit la stratégie d'Assurance Qualité (QA) logicielle mise en œuvre sur le périmètre du Proof of Concept (POC), visant à garantir la conformité fonctionnelle et technique avant tout déploiement sur l'orchestrateur.

## 1. Niveaux de validation (Pyramide des Tests)

Le processus de test repose sur deux strates d'évaluation automatisées, exécutées par le framework Jest.

### A. Tests Unitaires (Validation de la logique métier)
*   **Périmètre évalué :** Les classes de type `Service` contenant la valeur ajoutée algorithmique.
*   **Méthodologie :** Isolation totale du code testé. Les dépendances externes, notamment les interactions avec le moteur de base de données PostgreSQL, sont simulées via des objets de substitution (Mocks).
*   **Objectif technique :** Confirmer que l'application traite les données correctement indépendamment de l'état de l'infrastructure réseau ou de stockage.

### B. Tests d'Intégration E2E (Validation des contrats d'interface)
*   **Périmètre évalué :** Les points de terminaison (Endpoints) de l'API REST exposés par les `Controllers`.
*   **Méthodologie :** Simulation complète du cycle de vie d'une requête HTTP. Le processus vérifie la bonne interaction entre les gardes de sécurité (extraction de l'identité Keycloak), la validation des DTO, l'appel au service, et le formatage de la réponse HTTP.
*   **Objectif technique :** Garantir que les contrats d'API (requêtes et réponses) respectent strictement les critères d'acceptation définis dans les User Stories du Backlog.

## 2. Automatisation et Intégration Continue (Usine Logicielle)

La stratégie repose sur une politique de "Quality Gate" (barrière de qualité) stricte. 

L'exécution intégrale de ces deux suites de tests est systématisée à chaque soumission de code sur le gestionnaire de versions. Le pipeline de livraison continue (CI/CD) est configuré pour bloquer immédiatement la construction de l'image Docker applicative si une seule assertion de test renvoie un code d'erreur, interdisant de fait toute régression sur l'environnement cible.