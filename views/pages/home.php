<section class="home-section" id="projectsContainer">
	<header class="home__header">
		<div class="home__heading home__heading--first">
			<? Functions::getSVG('steven'); ?>
		</div>
		<div class="home__heading home__heading--second">
			<? Functions::getSVG('full-stack-developer')?>
		</div>
	</header>

    <? foreach (Functions::getProjects() as $key => $project) { ?>
        <article class="home-project" data-row="<?= (5 + $key) . ',' . (3 + $key); ?>" data-column="<?= $project->positions->column; ?>">
            <div class="home-project__plus" data-pos="<?= $project->positions->plus; ?>">
                <h3 class="home-project__title"><?= $project->name; ?></h3>
            </div>

            <a href="/project/<?= $project->slug; ?>" class="home-project__container">
                <figure class="home-project__figure">
                    <div class="home-project__figure-inner">
                        <img src="<?= Functions::getImage($project->slug, 'featured', '.png'); ?>" class="home-project__image" alt="<?= $project->name; ?>">
                        <span class="home-project__view">View</span>
                    </div>
                    <figcaption class="home-project__figcaption"><?= $project->name; ?></figcaption>
                </figure>
            </a>
        </article>
    <? } ?>
</section>

<div class="grid" id="fillGrid"></div>
