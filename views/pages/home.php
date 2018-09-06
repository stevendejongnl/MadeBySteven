<section class="home-section" id="projectsContainer">
	<header class="home__header">
		<div class="home__heading home__heading--first">
			<? Functions::getSVG('steven'); ?>
		</div>
		<div class="home__heading home__heading--second">
			<? Functions::getSVG('full-stack-developer')?>
		</div>
	</header>

	<article class="home-project" data-row="5,3" data-column="9">
        <div class="home-project__plus" data-pos="5">
            <h3 class="home-project__title">Project 1</h3>
        </div>

		<a href="/project" class="home-project__container">
			<figure class="home-project__figure">
				<div class="home-project__figure-inner">
					<img src="https://picsum.photos/1600/800?image=2" class="home-project__image" alt="Project 1">
					<span class="home-project__view">View</span>
				</div>
				<figcaption class="home-project__figcaption">Project 1</figcaption>
			</figure>
		</a>
	</article>

	<article class="home-project" data-row="6,4" data-column="4">
		<div class="home-project__plus" data-pos="0">
            <h3 class="home-project__title">Project 2</h3>
        </div>

        <a href="/project" class="home-project__container">
            <figure class="home-project__figure">
                <div class="home-project__figure-inner">
                    <img src="https://picsum.photos/1600/800?image=3" class="home-project__image" alt="Project 2">
                    <span class="home-project__view">View</span>
                </div>
                <figcaption class="home-project__figcaption">Project 2</figcaption>
            </figure>
        </a>
	</article>

	<article class="home-project" data-row="7,5" data-column="7">
        <div class="home-project__plus" data-pos="3">
            <h3 class="home-project__title">Project 3</h3>
        </div>

        <a href="/project" class="home-project__container">
			<figure class="home-project__figure">
				<div class="home-project__figure-inner">
					<img src="https://picsum.photos/1600/800?image=4" class="home-project__image" alt="Project 3">
					<span class="home-project__view">View</span>
				</div>
				<figcaption class="home-project__figcaption">Project 3</figcaption>
			</figure>
		</a>
	</article>

	<article class="home-project" data-row="8,6" data-column="2">
        <div class="home-project__plus" data-pos="4">
            <h3 class="home-project__title">Project 4</h3>
        </div>

        <a href="/project" class="home-project__container">
			<figure class="home-project__figure">
				<div class="home-project__figure-inner">
					<img src="https://picsum.photos/1600/800?image=5" class="home-project__image" alt="Project 4">
					<span class="home-project__view">View</span>
				</div>
				<figcaption class="home-project__figcaption">Project 4</figcaption>
			</figure>
		</a>
	</article>
</section>

<div class="grid" id="fillGrid"></div>
