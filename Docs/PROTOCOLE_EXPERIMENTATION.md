> # Protocole d'expérimentation (Bac à sable)
> **Projet :** Plateforme "La Petite Maison de l'Épouvante"
> **Objectif :** Valider les choix technologiques majeurs pour le développement du backend, en tenant compte des compétences de l'équipe (1 Lead, 2 profils juniors) et des exigences de sécurité et de scalabilité.
> 
> ---
> 
> ### Expérimentation 1 : Choix du Framework Backend
> **Hypothèse :** L'écosystème Node.js est pertinent. Nous devons comparer Express.js et NestJS pour déterminer lequel est le plus adapté à notre équipe.
> 
> *   **Protocole :** Création d'une API "Hello World" avec une route de validation de données entrantes (ex: création d'un utilisateur) sur les deux frameworks.
> *   **Résultats obtenus :** 
>     *   *Express.js :* Mise en place très rapide. Cependant, la structure du projet est totalement libre, ce qui a causé des divergences d'organisation lors des tests croisés avec les développeurs juniors.
>     *   *NestJS :* Mise en place légèrement plus longue. Utilisation native de TypeScript. La structure en modules, contrôleurs et services est stricte.
> *   **Difficultés rencontrées :** Avec Express, la mise en place d'une validation forte des données a nécessité l'installation et la configuration fastidieuse de librairies tierces (comme Joi ou Zod). NestJS intègre des *Pipes* et des *DTO* (Data Transfer Objects) nativement, bien que la courbe d'apprentissage des décorateurs TypeScript soit un peu rude au début.
> *   **Conclusion / Décision :** **Adoption de NestJS.** Sa rigueur architecturale est un atout majeur pour encadrer nos développeurs juniors et éviter la dette technique. Le typage fort (TypeScript) réduira les erreurs en production. Express est rejeté pour ce projet d'envergure.
> 
> ---
> 
> ### Expérimentation 2 : Choix du Système de Base de Données
> **Hypothèse :** Le projet requiert de stocker des données très structurées (ventes e-commerce) et des données semi-structurées (articles d'échange avec des caractéristiques variables). Comparaison entre PostgreSQL (SQL) et MongoDB (NoSQL).
> 
> *   **Protocole :** Déploiement local des deux bases via Docker. Modélisation et insertion d'un "Article communautaire" avec des champs flexibles (état de l'objet, tags).
> *   **Résultats obtenus :**
>     *   *MongoDB :* Parfait pour l'insertion rapide de documents hétérogènes. Très flexible.
>     *   *PostgreSQL :* Requiert un schéma strict initialement, mais l'utilisation du type de colonne `JSONB` permet de stocker des attributs flexibles tout en conservant la puissance des relations SQL.
> *   **Difficultés rencontrées :** Sur MongoDB, garantir l'intégrité référentielle (lier un article à un utilisateur de manière forte) demande plus de logique applicative côté code. 
> *   **Conclusion / Décision :** **Adoption de PostgreSQL.** La robustesse transactionnelle (ACID) est non-négociable pour la future partie "Boutique en ligne" du projet. Le type `JSONB` nous offre la flexibilité "NoSQL" dont nous avons besoin pour l'espace communautaire. MongoDB est rejeté pour éviter de maintenir deux systèmes de bases de données différents.
> 
> ---
> 
> ### Expérimentation 3 : Sécurisation des accès (Authentification)
> **Hypothèse :** Développer un système d'authentification "maison" présente un risque critique pour cette plateforme commerciale. Test d'intégration d'un fournisseur d'identité tiers : Keycloak.
> 
> *   **Protocole :** Déploiement de Keycloak via Docker (`docker run -p 8080:8080 quay.io/keycloak/keycloak`). Création d'un royaume (Realm) et tentative de connexion d'un client NestJS via la librairie `nest-keycloak-connect`.
> *   **Résultats obtenus :** Génération réussie de tokens JWT. Les routes de l'API NestJS ont pu être protégées efficacement avec le décorateur `@Authenticated()`.
> *   **Difficultés rencontrées :** La configuration de Keycloak (comprendre les concepts de Clients, Realms, et Roles) est dense. Le paramétrage de l'URL du fournisseur d'identité dans les variables d'environnement de NestJS a nécessité plusieurs essais pour fonctionner dans le réseau Docker local.
> *   **Conclusion / Décision :** **Adoption de Keycloak.** L'effort d'intégration initial est largement compensé par le niveau de sécurité obtenu (standards OAuth2 / OpenID Connect gérés nativement). Cela décharge l'équipe de développement de la gestion sensible des mots de passe.