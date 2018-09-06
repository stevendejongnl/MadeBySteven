<header class="main-header">
	<button class="button--reset button--menu<?= ($pageInfo->page === 'home' ? ' button--home' : ''); ?>" id="openMenu">
		<span class="line"></span>
		<span class="line"></span>
		<span class="line"></span>
	</button>

	<nav class="navigation__container" role="navigation" id="navigation">
		<ul class="list--reset navigation__list">
			<li class="navigation__item<?= ($pageInfo->page === 'home' ? ' navigation__item--active' : ''); ?>">
				<a href="/" class="navigation__link" aria-label="Home">Home</a>
			</li>
			<li class="navigation__item<?= ($pageInfo->page === 'about' ? ' navigation__item--active' : ''); ?>">
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
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 512">
						<path d="M186.1 328.7c0 20.9-10.9 55.1-36.7 55.1s-36.7-34.2-36.7-55.1 10.9-55.1 36.7-55.1 36.7 34.2 36.7 55.1zM480 278.2c0 31.9-3.2 65.7-17.5 95-37.9 76.6-142.1 74.8-216.7 74.8-75.8 0-186.2 2.7-225.6-74.8-14.6-29-20.2-63.1-20.2-95 0-41.9 13.9-81.5 41.5-113.6-5.2-15.8-7.7-32.4-7.7-48.8 0-21.5 4.9-32.3 14.6-51.8 45.3 0 74.3 9 108.8 36 29-6.9 58.8-10 88.7-10 27 0 54.2 2.9 80.4 9.2 34-26.7 63-35.2 107.8-35.2 9.8 19.5 14.6 30.3 14.6 51.8 0 16.4-2.6 32.7-7.7 48.2 27.5 32.4 39 72.3 39 114.2zm-64.3 50.5c0-43.9-26.7-82.6-73.5-82.6-18.9 0-37 3.4-56 6-14.9 2.3-29.8 3.2-45.1 3.2-15.2 0-30.1-.9-45.1-3.2-18.7-2.6-37-6-56-6-46.8 0-73.5 38.7-73.5 82.6 0 87.8 80.4 101.3 150.4 101.3h48.2c70.3 0 150.6-13.4 150.6-101.3zm-82.6-55.1c-25.8 0-36.7 34.2-36.7 55.1s10.9 55.1 36.7 55.1 36.7-34.2 36.7-55.1-10.9-55.1-36.7-55.1z"/>
					</svg>
				</a>
			</li>
			<li class="social-links__item">
				<a href="https://www.linkedin.com/in/stevendejongnl" target="_blank" class="social-links__link">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
						<path d="M100.3 480H7.4V180.9h92.9V480zM53.8 140.1C24.1 140.1 0 115.5 0 85.8 0 56.1 24.1 32 53.8 32c29.7 0 53.8 24.1 53.8 53.8 0 29.7-24.1 54.3-53.8 54.3zM448 480h-92.7V334.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V480h-92.8V180.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V480z"/>
					</svg>
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
