"""Repository directories mapped to stable, flat public asset URLs."""
from pathlib import Path

def asset_files(root):
    root = Path(root)
    paths = [p for p in root.iterdir() if p.is_file()]
    for folder in ('images', 'css', 'js'):
        paths.extend(p for p in (root/'assets'/folder).glob('*') if p.is_file())
    result = {}
    for path in paths:
        if path.name in result:
            raise ValueError('Nome pubblico duplicato: ' + path.name)
        result[path.name] = path
    return result

def asset_path(root, name):
    # Public filenames cannot escape the repository or include directory traversal.
    if Path(name).name != name or '/' in name or '\\' in name:
        return None
    root = Path(root)
    matches = [p for p in [root/name] + [root/'assets'/folder/name for folder in ('images','css','js')] if p.is_file()]
    if len(matches) > 1:
        raise ValueError('Nome pubblico duplicato: ' + name)
    return matches[0] if matches else None
