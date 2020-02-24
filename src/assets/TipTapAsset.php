<?php

namespace digitalnatives\tiptap\assets;

use craft\web\AssetBundle;
use craft\web\assets\vue\VueAsset;

/**
 * TipTap asset bundle
 */
class TipTapAsset extends AssetBundle
{
    /**
     * @inheritdoc
     */
    public function init()
    {
        $this->sourcePath = dirname(__DIR__, 2).'/js/wrapper.js';
        $this->depends = [
            VueAsset::class
        ];
        $this->js = [
            'js/wrapper.js',
        ];

        parent::init();
    }
}
