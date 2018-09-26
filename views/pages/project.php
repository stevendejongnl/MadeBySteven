<? $project = Functions::getProject(); ?>

<section class="project-section">
    <h1 class="heading--first"><?= $project->name; ?><br class="hide--for-desktop"></h1>

    <ul class="list--reset project-links">
        <? if ($project->github) { ?>
            <li class="project-links__item">
                <a href="<?= $project->github; ?>" class="project-links__link" target="_blank">
                    <? Functions::getSVG('github'); ?>
                </a>
            </li>
        <? } ?>

        <? if ($project->link) { ?>
            <li class="project-links__item">
                <a href="<?= $project->link; ?>" class="project-links__link" target="_blank">
                    <? Functions::getSVG('link'); ?>
                </a>
            </li>
        <? } ?>
    </ul>

    <div class="project-info wrapper">
        <p class="paragraph"><?= $project->description; ?></p>
        <div class="project-info__date">
            <h3 class="heading--third">Date</h3>
            <span><?= date('d-m-Y', strtotime($project->date)); ?></span>
        </div>

        <div class="project-info__client">
            <h3 class="heading--third">Client</h3>
            <span><?= (!$project->client->logo ? $project->client->name : '<img src="/data/projects/images/$project->slug/logo.png" alt="$project->client->name">'); ?></span>
        </div>

        <div class="project-info__tech">
            <? if ($project->tech) { ?>
                <h3 class="heading--third">Tech used</h3>

                <ul class="list--reset tech__list">
                    <? foreach ($project->tech as $tech) { ?>
                        <li class="tech__item">
                            <? Functions::getSVG($tech); ?>
                        </li>
                    <? } ?>
                </ul>
            <? } ?>
        </div>
    </div>

    <? if (!empty($project->images)) Functions::getPart('gallery', $project); ?>
</section>
