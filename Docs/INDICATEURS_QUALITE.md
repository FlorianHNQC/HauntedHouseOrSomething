# Pilotage des Indicateurs de Qualité Logicielle (Plateforme Globale)

**Date :** 18 Mars 2026

**Référentiel :** Norme ISO/IEC 25010

**Périmètre :** Plateforme complète (E-commerce, Communauté, Enchères temps réel, VOD).

Afin de garantir la scalabilité de l'architecture microservices et de maîtriser la dette technique sur l'ensemble des modules applicatifs, le pilotage s'appuie sur quatre indicateurs macroscopiques.

## 1. Fiabilité : Taux de Disponibilité (SLA)
*   **Objectif cible :** Disponibilité > 99.9% (Uptime) sur les services critiques (Paiement, Enchères, IAM).
*   **Outil de mesure :** Sondes de monitoring Kubernetes (Prometheus / Grafana) et APM (Datadog/New Relic).
*   **Impact sur la dette technique :** Un SLA dégradé révèle une infrastructure fragile (Single Point of Failure) ou une mauvaise gestion des erreurs réseau. Maintenir ce taux force l'implémentation de patterns de résilience (Circuit Breaker, Autoscaling HPA) sur tous les nouveaux microservices.

## 2. Sécurité : Délai Moyen de Remédiation (MTTR - Vulnérabilités)
*   **Objectif cible :** Correction des failles critiques (SCA/DAST) en moins de 24h.
*   **Outil de mesure :** Rapports centralisés de l'usine logicielle (GitHub Advanced Security / SonarQube / Trivy).
*   **Impact sur la dette technique :** La plateforme manipulant des transactions financières et des données personnelles, l'accumulation de dépendances obsolètes crée une dette sécuritaire mortelle. Ce KPI impose une politique stricte de mise à jour continue (Shift-Left) sur l'ensemble des dépôts de code.

## 3. Efficacité de Performance : Latence p95 sur les Flux Critiques
*   **Objectif cible :** Temps de réponse < 200 ms pour 95% des requêtes (API E-commerce et WebSockets Enchères).
*   **Outil de mesure :** Tests de charge continus (Artillery/K6) intégrés dans les pipelines de pré-production.
*   **Impact sur la dette technique :** L'ajout de fonctionnalités (VOD, recommandations) alourdit la base de données. Mesurer la latence globale permet d'identifier l'apparition de goulots d'étranglement (ex: requêtes N+1, manque d'index PostgreSQL, absence de cache Redis) avant qu'ils ne s'ancrent dans l'architecture.

## 4. Maintenabilité : Indice de Qualité du Code (Couverture & Dette)
*   **Objectif cible :** Couverture de tests globale > 85% et notation globale "A" sur la dette technique (Clean Code).
*   **Outil de mesure :** SonarQube (Quality Gate bloquante dans le pipeline CI/CD) et Jest.
*   **Impact sur la dette technique :** Avec l'intégration de développeurs juniors et la multiplication des microservices, le code "spaghetti" est le risque principal. Cet indicateur garantit une architecture modulaire et documentée, réduisant le coût de maintenance et de refactorisation.