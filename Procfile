location / {
    root /app;

    try_files $uri @rewriteapp;
}

location @rewriteapp {
    rewrite ^(.*)$ /app/index.php/$1 last;
}