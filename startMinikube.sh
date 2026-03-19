#!/bin/bash

# Définition des couleurs pour un affichage lisible dans le terminal
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PURGE_MODE=false

# Analyse des arguments passés au script
while getopts "r" opt; do
  case ${opt} in
    r )
      PURGE_MODE=true
      ;;
    \? )
      echo "Usage: ./startMinikube.sh [-r]"
      echo "  -r : Force la suppression totale (purge) de Minikube avant le redémarrage."
      exit 1
      ;;
  esac
done

echo -e "${YELLOW}[INFO] Étape 1 : Arrêt de l'instance Minikube courante...${NC}"
# Ajout de '|| true' et '2>/dev/null' pour ignorer l'erreur silencieusement si Minikube n'existe pas encore
minikube stop 2>/dev/null || true

# CORRECTION : Ajout des espaces obligatoires après 'if' et après '['
if [ "$PURGE_MODE" = true ]; then
    echo -e "${YELLOW}[INFO] Étape 2 : Mode purge (-r) activé. Suppression totale du cluster et du cache...${NC}"
    minikube delete --all --purge
else
    echo -e "${YELLOW}[INFO] Étape 2 : Démarrage classique (sans purge).${NC}"
fi

echo -e "${YELLOW}[INFO] Étape 3 : Lancement de Minikube...${NC}"
minikube start

echo -e "${YELLOW}[INFO] Étape 4 : Activation des modules obligatoires pour le projet...${NC}"
minikube addons enable ingress
minikube addons enable metrics-server

echo -e "${GREEN}[SUCCÈS] Le cluster Minikube est prêt à recevoir vos déploiements !${NC}"

# Redirection du contexte Docker vers Minikube
eval $(minikube docker-env)

# Construction de l'image depuis la racine du projet
docker build -t maison-epouvante-api:latest ./service-communaute