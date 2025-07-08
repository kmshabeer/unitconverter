def convert_unit(metric: str, from_unit: str, to_unit: str, value: float):
    if metric == "length":
        return convert_length(from_unit, to_unit, value)
    elif metric == "temperature":
        return convert_temperature(from_unit, to_unit, value)
    else:
        raise ValueError("Unsupported metric")

def convert_length(from_unit, to_unit, value):
    # Supported: meter, kilometer, mile, yard
    to_meters = {
        "meter": 1.0,
        "kilometer": 1000.0,
        "mile": 1609.34,
        "yard": 0.9144,
    }
    if from_unit not in to_meters or to_unit not in to_meters:
        raise ValueError("Unsupported length unit")
    value_in_meters = value * to_meters[from_unit]
    return value_in_meters / to_meters[to_unit]

def convert_temperature(from_unit, to_unit, value):
    # Supported: celsius, fahrenheit, kelvin
    if from_unit == to_unit:
        return value
    if from_unit == "celsius":
        if to_unit == "fahrenheit":
            return value * 9/5 + 32
        elif to_unit == "kelvin":
            return value + 273.15
    elif from_unit == "fahrenheit":
        if to_unit == "celsius":
            return (value - 32) * 5/9
        elif to_unit == "kelvin":
            return (value - 32) * 5/9 + 273.15
    elif from_unit == "kelvin":
        if to_unit == "celsius":
            return value - 273.15
        elif to_unit == "fahrenheit":
            return (value - 273.15) * 9/5 + 32
    raise ValueError("Unsupported temperature unit") 