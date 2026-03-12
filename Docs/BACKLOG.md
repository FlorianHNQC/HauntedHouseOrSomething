> # Backlog du POC : Espace Communautaire "La Petite Maison de l'Épouvante"
> 
> ## US-01 : Proposer un article à l'échange (Périmètre du POC)
> **En tant que** membre authentifié de la communauté,
> **Je veux** pouvoir soumettre un de mes articles de collection (figurine, fanzine, etc.) via un formulaire,
> **Afin de** le proposer à l'échange ou au don aux autres passionnés.
> 
> **Critères d'acceptation :**
> *   **CA1 :** L'accès à la route d'API permettant la soumission (ex: `POST /api/echanges/articles`) doit être bloqué si l'utilisateur n'est pas authentifié (Vérification du Token JWT Keycloak).
> *   **CA2 :** Le système doit valider que les champs obligatoires sont présents : `titre` (texte), `description` (texte), `type_offre` (échange ou don).
> *   **CA3 :** À la soumission, l'article est enregistré en base de données avec un statut par défaut "EN_ATTENTE_MODERATION".
> *   **CA4 :** L'API doit retourner un code HTTP 201 (Created) avec les détails de l'article créé en cas de succès.
> 
> ---
> 
> ## US-02 : Lister les articles disponibles à l'échange (Hors périmètre du POC)
> **En tant que** visiteur ou membre de la communauté,
> **Je veux** consulter la liste des articles approuvés par la modération,
> **Afin de** trouver des objets qui m'intéressent.
> 
> **Critères d'acceptation :**
> *   **CA1 :** L'API (ex: `GET /api/echanges/articles`) retourne uniquement les articles ayant le statut "APPROUVE".
> *   **CA2 :** Les résultats sont paginés (10 articles par page).
