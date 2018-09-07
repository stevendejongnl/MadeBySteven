<section class="project-section">
    <h1 class="heading--first">Astronomy Or<br class="hide--for-desktop"> Astrology</h1>

    <ul class="list--reset project-links">
        <li class="project-links__item">
            <a href="/" class="project-links__link">
                <? Functions::getSVG('github'); ?>
            </a>
        </li>

        <li class="project-links__item">
            <a href="/" class="project-links__link">
                <? Functions::getSVG('link'); ?>
            </a>
        </li>
    </ul>

    <div class="project-info wrapper">
        <p class="paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur debitis dolorum error expedita, facilis iure libero magni maiores modi molestias odit quae quas quis quo, repellendus reprehenderit sunt ullam, voluptate!</p>
        <div class="project-info__date">
            <h3 class="heading--third">Date</h3>
            <span><?= date('d-m-Y'); ?></span>
        </div>

        <div class="project-info__client">
            <h3 class="heading--third">Client</h3>
            <span>Name or logo</span>
        </div>

        <div class="project-info__tech">
            <h3 class="heading--third">Tech used</h3>

            <ul class="list--reset tech__list">
                <li class="tech__item">
			        <? Functions::getSVG('angular'); ?>
                </li>
                <li class="tech__item">
			        <? Functions::getSVG('bootstrap'); ?>
                </li>
                <li class="tech__item">
			        <? Functions::getSVG('css3'); ?>
                </li>
                <li class="tech__item">
			        <? Functions::getSVG('grunt'); ?>
                </li>
                <li class="tech__item">
			        <? Functions::getSVG('gulp'); ?>
                </li>
                <li class="tech__item">
			        <? Functions::getSVG('javascript'); ?>
                </li>
                <li class="tech__item">
			        <? Functions::getSVG('jquery'); ?>
                </li>
            </ul>
        </div>
    </div>

    <? Functions::getPart('gallery'); ?>
</section>
