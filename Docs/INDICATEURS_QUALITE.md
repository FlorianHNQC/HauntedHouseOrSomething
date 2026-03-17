# Pilotage des Indicateurs de Qualité Logicielle

**Projet :** Plateforme "La Petite Maison de l'Épouvante"
**Rédacteur :** Lead Developer / Architecte Logiciel
**Référentiel :** Norme ISO/IEC 25010

Afin de garantir la pérennité de la plateforme applicative et de prévenir l'accumulation de dette technique, le pilotage de l'ingénierie repose sur le suivi systématique de quatre indicateurs de qualité fondamentaux.

## 1. Maintenabilité : Taux de Couverture de Code (Code Coverage)
*   **Objectif cible :** > 80% de couverture sur les modules de logique métier (Services).
*   **Outil de mesure :** Framework Jest, automatisé via l'usine logicielle (CI).
*   **Impact sur la dette technique :** L'absence de tests transforme rapidement le code en système "Legacy" inmaintenable. Ce suivi force la modularité du code et garantit qu'aucune régression fonctionnelle ne sera introduite lors des futures refactorisations.

## 2. Sécurité : Taux de Vulnérabilités Détectées (Zero-Known-Vulnerabilities)
*   **Objectif cible :** 0 vulnérabilité de sévérité Haute ou Critique sur les dépendances.
*   **Outil de mesure :** Outils d'analyse SCA (Software Composition Analysis) exécutés à chaque compilation (Pipeline CI).
*   **Impact sur la dette technique :** La mise à jour différée de composants vulnérables génère un coût de remédiation exponentiel. Cette métrique impose une hygiène de sécurité en continu (Shift-Left Security), bloquant le déploiement de failles connues.

## 3. Performance : Latence du 95ème Percentile (p95 Response Time)
*   **Objectif cible :** Temps de réponse < 200 millisecondes pour 95% du trafic sur les requêtes de lecture.
*   **Outil de mesure :** Outils de test de charge distribués (Artillery / K6).
*   **Impact sur la dette technique :** Une dégradation silencieuse des performances traduit généralement des anomalies architecturales (requêtes SQL non indexées, problèmes de N+1). Cette mesure prévient la saturation des bases de données en production en détectant les goulots d'étranglement dès la phase de test.

## 4. Fiabilité : Taux de Succès de l'Intégration Continue (CI Success Rate)
*   **Objectif cible :** > 95% de succès sur la branche de livraison principale.
*   **Outil de mesure :** Métriques d'observabilité du pipeline de déploiement (GitHub Actions).
*   **Impact sur la dette technique :** Des échecs fréquents du pipeline témoignent de tests instables (flaky tests) ou d'une configuration d'environnement asymétrique. Maintenir un taux de succès élevé garantit la fiabilité du processus de "Release" et la confiance de l'équipe dans les livrables.