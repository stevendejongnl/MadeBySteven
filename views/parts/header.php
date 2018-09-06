<header class="main-header">
	<button class="button--reset button--menu<?= ($getPage->slug === 'home' ? ' button--home' : ''); ?>" id="openMenu">
		<span class="line"></span>
		<span class="line"></span>
		<span class="line"></span>
	</button>

	<nav class="navigation__container" role="navigation" id="navigation">
		<ul class="list--reset navigation__list">
			<li class="navigation__item<?= ($getPage->slug === 'home' ? ' navigation__item--active' : ''); ?>">
				<a href="/" class="navigation__link" aria-label="Home">Home</a>
			</li>
			<li class="navigation__item<?= ($getPage->slug === 'about' ? ' navigation__item--active' : ''); ?>">
				<a href="/about" class="navigation__link" aria-label="About">About</a>
			</li>
			<li class="navigation__item">
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
		<article class="project__item">
			<a href="/project" class="project__link">
				<figure class="figure--reset">
					<img src="https://picsum.photos/1600/800?image=2" class="project__image" alt="Project 1">
					<figcaption class="project__title" onmouseover="this.innerHTML='<span>View</span>';" onmouseout="this.innerHTML='<span>Project 1</span>';">
                        <span>Project 1</span>
                    </figcaption>
				</figure>
			</a>
		</article>

		<article class="project__item">
			<a href="/project" class="project__link">
				<figure class="figure--reset">
					<img src="https://picsum.photos/1600/800?image=3" class="project__image" alt="Project 2">
					<figcaption class="project__title" onmouseover="this.innerHTML='<span>View</span>';" onmouseout="this.innerHTML='<span>Project 2</span>';">
                        <span>Project 2</span>
                    </figcaption>
				</figure>
			</a>
		</article>

		<article class="project__item">
			<a href="/project" class="project__link">
				<figure class="figure--reset">
					<img src="https://picsum.photos/1600/800?image=4" class="project__image" alt="Project 3">
					<figcaption class="project__title" onmouseover="this.innerHTML='<span>View</span>';" onmouseout="this.innerHTML='<span>Project 3</span>';">
                        <span>Project 3</span>
                    </figcaption>
				</figure>
			</a>
		</article>

		<article class="project__item">
			<a href="/project" class="project__link">
				<figure class="figure--reset">
					<img src="https://picsum.photos/1600/800?image=5" class="project__image" alt="Project 4">
					<figcaption class="project__title" onmouseover="this.innerHTML='<span>View</span>';" onmouseout="this.innerHTML='<span>Project 4</span>';">
                        <span>Project 4</span>
                    </figcaption>
				</figure>
			</a>
		</article>

		<article class="project__item">
			<a href="/project" class="project__link">
				<figure class="figure--reset">
					<img src="https://picsum.photos/1600/800?image=6" class="project__image" alt="Project 5">
					<figcaption class="project__title" onmouseover="this.innerHTML='<span>View</span>';" onmouseout="this.innerHTML='<span>Project 5</span>';">
                        <span>Project 5</span>
                    </figcaption>
				</figure>
			</a>
		</article>
	</section>
</header>
