location / {
    root /;

    try_files $uri @rewriteapp;
}

location @rewriteapp {
    rewrite ^(.*)$ /index.php/$1 last;
}