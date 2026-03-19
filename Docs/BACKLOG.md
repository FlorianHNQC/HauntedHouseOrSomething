# Backlog Produit Global : "La Petite Maison de l'Épouvante"

**Date :** 18 Mars 2026

**Statut :** Vision globale (V1, V2, V3) et délimitation du POC.

---

## 1. Epics (Macro-Fonctionnalités)

Le produit est découpé en 4 Epics majeurs répondant à l'ensemble du cahier des charges.

*   **EPIC 1 : E-commerce et Fanzine (V1)**
    *   Vente de produits dérivés (goodies, Blu-ray, jeux).
    *   Gestion des abonnements au fanzine (papier et numérique).
    *   Liseuse intégrée pour les fanzines numériques.
    *   Moteur de recommandation basé sur l'historique et la navigation.
*   **EPIC 2 : Espace Communautaire (V1)**
    *   Dépôt d'annonces de troc/don entre particuliers.
    *   Messagerie instantanée (Chat) entre passionnés.
    *   Système de notifications paramétrable (alertes sur centres d'intérêt, baisses de prix).
*   **EPIC 3 : Évolutions V2 / V3 (Enchères & Médias)**
    *   V2 : Système d'enchères dynamiques (type eBay) pour les objets rares.
    *   V2 : Plateforme de diffusion vidéo (VOD) pour les productions "Evil Ed".
    *   V3 : Séances de festival virtuelles (jauges de places limitées, créneaux horaires stricts).
*   **EPIC 4 : Administration, Sécurité et Conformité**
    *   Modération des annonces et de la communauté.
    *   Intégration d'un outil automatisé de détection des fraudes (prix anormaux, vendeurs suspects).
    *   Mise en conformité RGAA (Accessibilité) et RGPD.

---

## 2. User Stories (Aperçu du Backlog Global)

### EPIC 1 : E-commerce
*   **US-1.1 :** En tant que client, je veux souscrire ou renouveler un abonnement au fanzine afin d'y accéder au format numérique ou papier.
*   **US-1.2 :** En tant qu'abonné authentifié, je veux utiliser une liseuse intégrée à mon espace personnel afin de lire les fanzines dématérialisés.
*   **US-1.3 :** En tant que visiteur, je veux recevoir des recommandations de produits dérivés basées sur mes recherches afin de découvrir des articles pertinents.

### EPIC 2 : Espace Communautaire
*   **US-2.1 :** En tant qu'utilisateur, je veux configurer mes centres d'intérêt afin de recevoir des notifications (email/site) lors de la mise en ligne d'un article correspondant.
*   **US-2.2 :** En tant que membre, je veux accéder à un chat privé depuis mon espace afin de discuter d'un échange avec un autre passionné.

### EPIC 4 : Administration & Back-office
*   **US-4.1 :** En tant qu'administrateur, je veux recevoir une alerte du composant de détection de fraudes en cas de variation anormale de prix afin de bloquer une transaction suspecte.

---

## 3. Périmètre d'Implémentation du POC (Version actuelle)

Pour valider l'architecture technique (NestJS, PostgreSQL, Keycloak), seule la **US-2.3** (issue de l'Epic 2) a été implémentée de bout en bout dans le présent Proof of Concept.

### US-2.3 : Proposer un article à l'échange (POC)
En tant que membre authentifié de la communauté, pouvoir soumettre un de mes articles de collection via un formulaire, afin de le proposer à l'échange ou au don aux autres passionnés.

**Critères d'acceptation (Validés) :**
*   **CA1 (Sécurité) :** L'accès à la route d'API (`POST /api/echanges/articles`) est bloqué si l'utilisateur ne fournit pas un jeton JWT Keycloak valide.
*   **CA2 (Validation) :** Le système valide strictement la présence et le format des champs `titre` et `description`. Les champs non autorisés sont rejetés.
*   **CA3 (Persistance) :** À la soumission, l'article est enregistré en base de données (PostgreSQL) avec l'UUID de l'utilisateur (issu du jeton) et un statut "EN_ATTENTE_MODERATION".
*   **CA4 (Retour) :** L'API retourne un code HTTP 201 (Created) avec les détails de l'article créé en cas de succès.