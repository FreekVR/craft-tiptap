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
        $this->sourcePath = dirname(__DIR__, 2).'/lib/tiptap/dist';
        $this->depends = [
            VueAsset::class
        ];
        $this->js = [
            'tiptap.min.js',
        ];

        parent::init();
    }
}
