<header class="main-header">
	<button class="button--reset button--menu<?= ($getPage->template === 'home' ? ' button--home' : ''); ?>" id="openMenu">
		<span class="line"></span>
		<span class="line"></span>
		<span class="line"></span>
	</button>

	<nav class="navigation__container" role="navigation" id="navigation">
		<ul class="list--reset navigation__list">
			<li class="navigation__item<?= ($getPage->template === 'home' ? ' navigation__item--active' : ''); ?>">
				<a href="/" class="navigation__link" aria-label="Home">Home</a>
			</li>
			<li class="navigation__item<?= ($getPage->template === 'about' ? ' navigation__item--active' : ''); ?>">
				<a href="/about" class="navigation__link" aria-label="About">About</a>
			</li>
			<li class="navigation__item<?= ($getPage->template === 'project' ? ' navigation__item--active' : ''); ?>">
				<a href="/projects" class="navigation__link" id="openProjects"
				   aria-label="Projects">Projects</a>
			</li>
		</ul>

		<ul class="list--reset social-links">
			<li class="social-links__item">
				<a href="https://github.com/stevendejongnl" target="_blank" class="social-links__link">
					<? Functions::getSVG('github'); ?>
				</a>
			</li>
			<li class="social-links__item">
				<a href="https://www.linkedin.com/in/stevendejongnl" target="_blank" class="social-links__link">
					<? Functions::getSVG('linkedin'); ?>
				</a>
			</li>
		</ul>
	</nav>

	<section class="project__container" id="projects">
        <? foreach (Functions::getProjects(false) as $project) { ?>
		<article class="project__item" data-slug="/project/<?= $project->slug; ?>" data-name="<?= $project->name; ?>" data-image="<?= Functions::getImage($project->slug, "featured", ".png"); ?>">
            <a href="/project/<?= $project->slug; ?>" class="project__link">
                <figure class="figure--reset">
                    <img src="<?= Functions::getImage($project->slug, "featured", ".png"); ?>" class="project__image" alt="Project 1">
                    <figcaption class="project__title">
                        <span><?= $project->name; ?></span>
                    </figcaption>
                </figure>
            </a>
		</article>
        <? } ?>
	</section>
</header>
