# Enable/disable validation/strict validation

Acacha forms support carrying extra fields when posting to indicate backend you want to disable/enable validation/strict validation

The (hidden) extra fields are:
- acacha_forms_disable_strict_validation 
- acacha_forms_disable_validation

You can see a Trait example file you can aply to your Laravel Request object to enable/disable validation on backend:

CanDisableAndRestrictValidation:

```php
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
```

And a example StorePerson Request Objects using laravel-permision package to allow only users with permission to disable validation.

```php
<?php

namespace Acacha\Relationships\Http\Requests;

use Acacha\Relationships\Http\Requests\Traits\CanDisableAndRestrictValidation;
use Auth;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Class StorePerson.
 *
 * @package Acacha\Relationships\Http\Requests
 */
class StorePerson extends FormRequest
{

    use CanDisableAndRestrictValidation;

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        if ($this->acacha_forms_disable_validation) {
            if (Auth::user()->can('disable-validation')) return true;
            return false;
        }
        if ($this->acacha_forms_disable_strict_validation) {
            if (Auth::user()->can('disable-strict-validation')) return true;
            return false;
        }

        if (Auth::user()->can('store-person')) return true;
        return false;
    }

    /**
     * Strict validation rules.
     *
     * @var array
     */
    protected $strictRules = [
        'givenName' => 'required|string',
        'surname1' => 'required|string',
        'identifier' => 'required',
        'identifier_type' => 'required|exists:identifier_types,id',
        'birthdate' => 'required|before:now',
        'birthplace_id' => 'required|exists:locations,id',
        'gender' => 'required|in:male,female',
    ];

    /**
     * Validation rules.
     *
     * @var array
     */
    protected $rules = [
        'givenName' => 'required|string',
        'surname1' => 'required|string',
    ];
}

```

Please be careful and allow only users with permissions in backend to disable validation.

