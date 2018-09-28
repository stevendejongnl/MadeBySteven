<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><?= $getPage->title; ?></title>

    <link rel="stylesheet" href="/dist/styles/main.css">
</head>
<body>
<div class="blend-mode-bug-fix <?= $getPage->classes; ?>">
    <main role="main" class="main-container">
<? Functions::getPart('header');
