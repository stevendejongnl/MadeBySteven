<div class="gallery-holder">
    <div class="project-gallery" id="galleryContainer">
        <? foreach ($project->images as $key => $image) { ?>
            <article class="image" data-row="<?= (2 + $key); ?>"
                     data-column="<?= $image->positions->column; ?>">
                <div class="image__plus" data-pos="<?= $image->positions->plus; ?>"></div>

                <div class="image__container">
                    <figure class="image__figure">
                        <div class="image__figure-inner">
                            <img src="<?= $image->image; ?>" class="image__image"
                                 alt="<?= $project->name.' '.($key + 1); ?>">
                        </div>
                        <figcaption class="image__figcaption"><?= $image->content; ?></figcaption>
                    </figure>
                </div>
            </article>
        <? } ?>
    </div>

    <div class="grid grid--red  " id="fillGrid"></div>
</div>
