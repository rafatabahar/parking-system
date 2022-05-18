# Parking System API

## Insert Initial Data

```
POST http://localhost:3000/api/level

{
    "name": "B1",
    "number_of_slots": 3
}
```

## Park

```
POST http://localhost:3000/api/park

{
    "level": "B1",
    "slot": 1
}
```

## Leave

```
POST http://localhost:3000/api/leave

{
    "level": "B1",
    "slot": 1
}
```