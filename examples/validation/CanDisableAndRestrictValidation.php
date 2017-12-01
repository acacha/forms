<?php

namespace Acacha\Relationships\Http\Requests\Traits;

/**
 * Class DisableValidation
 *
 * @package Acacha\Relationships\Http\Requests\Traits
 */
trait CanDisableAndRestrictValidation
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        if ($this->acacha_forms_disable_validation) return [];
        if ($this->acacha_forms_disable_strict_validation) return $this->rules;
        return $this->strictRules;
    }
}