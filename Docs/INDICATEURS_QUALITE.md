# Suivi des Indicateurs de Qualité Logicielle

**Projet :** Plateforme "La Petite Maison de l'Épouvante"

**Rédacteur :** Lead Developer / Architecte Logiciel

**Référentiel :** Norme ISO/IEC 25010

Afin de piloter le développement du POC et de garantir la viabilité de la plateforme sur le long terme, quatre indicateurs de qualité ont été définis. Leur suivi systématique vise à prévenir l'accumulation de dette technique.

## 1. Maintenabilité : Couverture de Code par les Tests (Code Coverage)
*   **Objectif visé :** > 80% de couverture sur la logique métier (Services).
*   **Outil de mesure :** Jest (intégré au pipeline CI/CD).
*   **Lutte contre la dette technique :** Un code non testé est un code "legacy" en devenir. Mesurer la couverture oblige les développeurs juniors à concevoir un code modulaire et testable, réduisant ainsi le risque de régression lors des futures mises à jour ou refactorisations.

## 2. Sécurité : Taux de Vulnérabilités Critiques (Zero-Known-Vulnerabilities)
*   **Objectif visé :** 0 vulnérabilité critique ou haute sur les dépendances.
*   **Outil de mesure :** Outil d'analyse SCA (ex: `npm audit` ou Trivy) dans le pipeline CI.
*   **Lutte contre la dette technique :** Mettre à jour des dépendances obsolètes des mois après leur déploiement coûte exponentiellement plus cher que de le faire en continu. Cet indicateur force la mise à jour régulière des paquets (Shift-Left Security), évitant une dette sécuritaire paralysante.

## 3. Performance : Temps de Réponse de l'API (Latency)
*   **Objectif visé :** < 200 ms pour le 95ème percentile (p95) sur les requêtes de lecture.
*   **Outil de mesure :** Tests de charge automatisés (K6 / JMeter) exécutés sur l'environnement managé.
*   **Lutte contre la dette technique :** Une dégradation lente des performances indique souvent des requêtes SQL mal optimisées (N+1 queries) ou un manque d'indexation. Cet indicateur permet de détecter ces anomalies architecturales avant qu'elles ne saturent la base de données en production.

## 4. Fiabilité : Taux de Succès des Déploiements (Build & Release Success Rate)
*   **Objectif visé :** > 95% de succès sur la branche principale (`main`).
*   **Outil de mesure :** Statistiques de l'outil CI/CD (GitHub Actions / GitLab CI).
*   **Lutte contre la dette technique :** Des builds qui échouent fréquemment sont le symptôme d'environnements instables, de tests floconneux (flaky tests) ou de problèmes de configuration (le fameux "ça marche sur ma machine"). Suivre ce taux oblige l'équipe à fiabiliser les scripts de conteneurisation et l'infrastructure as code.
