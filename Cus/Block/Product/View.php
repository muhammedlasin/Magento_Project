<?php
namespace Ter\Cus\Block\Product;

class View extends \Magento\Framework\View\Element\Template
{
    /**
     * @var \Ter\Cus\Helper\Data
     */
    protected $_dataHelper;

    /**
     * @param \Magento\Framework\View\Element\Template\Context $context
     * @param \Ter\Cus\Helper\Data $dataHelper
     * @param array $data
     */
    public function __construct(
        \Magento\Framework\View\Element\Template\Context $context,
        \Ter\Cus\Helper\Data $dataHelper,
        array $data = []
    )
    {
        $this->_dataHelper = $dataHelper;
        parent::__construct($context, $data);
    }

    public function canShowBlock()
    {
        return $this->_dataHelper->isModuleEnabled();
    }
}