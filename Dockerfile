# commandes :
# docker build -t dockerize-vuejs-app .
# docker build -t dockerize-vuejs-app --build-arg http_proxy --build-arg https_proxy .
# docker run -it -p 8888:80 --rm --name dockerize-vuejs-app-1 dockerize-vuejs-app
# avec un accès à notre app sur http://localhost:8888

# proxy settings dans docker :
# cf. https://docs.docker.com/config/daemon/systemd/#httphttps-proxy
# ajouter ou commenter les fichiers :
#  /etc/systemd/system/docker.service.d/http-proxy.conf
#  /etc/systemd/system/docker.service.d/https-proxy.conf
# sudo systemctl daemon-reload
# sudo systemctl restart docker
# systemctl show --property=Environment docker

# étape de build
FROM node:lts-alpine as build-stage

# RUN export http_proxy=${http_proxy}
# RUN export https_proxy=${https_proxy}
# RUN npm config set https-proxy {http_proxy}
# RUN npm config set proxy ${https_proxy}

# définit le dossier 'app' comme dossier de travail
WORKDIR /app

# copie 'package.json' et 'package-lock.json' (si disponible)
# cf. http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/
COPY package*.json ./

# installe les dépendances du projet
RUN npm install

# copie les fichiers et dossiers du projet dans le dossier de travail
# (par exemple : le dossier 'app')
COPY . .

# construit l'app pour la production en la minifiant
RUN npm run build
# en mode dev...
# RUN npm run build -- --mode development

# RUN unset http_proxy
# RUN unset https_proxy

# étape de production
FROM nginx:stable-alpine as production-stage

# copie du dossier des binaires dans nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

#
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
